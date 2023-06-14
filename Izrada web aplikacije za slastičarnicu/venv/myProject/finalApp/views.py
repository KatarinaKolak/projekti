from django.shortcuts import render
from .forms import sort, sortUser, userForm, productForm, cartForm, cartItemForm, PaymentOptions, cardDetails, shippingForm, orderStatusForm, takenOrderForm, cakeCategoryForm
from .models import User, Product, Cart, Shipping, CartItem, FavouritesItem, OrderStatus, CakeCategory
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as auth_logout
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from .appDecorators import user_required, admin_required
from .filters import productFilter
import datetime
import operator

User = get_user_model()

# home page
def homeView(request):
    all_products = Product.objects.all()   # get all products from database

    favs_list = []
    category_ids = []
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    carts = Cart.objects.all()
    cartItems = CartItem.objects.all()
    favouriteItems = FavouritesItem.objects.all()
    categories = CakeCategory.objects.all()
    for product in all_products:
        for fav in favouriteItems:
            if product.id == fav.product_id:
                favs_list.append(product.id)

    
    for category in categories:
        for product in all_products:
            if category.id == product.cakeCategory_id:
                category_ids.append(category.id)

    return render(request, 'home.html', {'ids':category_ids, 'categories':categories, 'favouriteItems':favs_list, 'products':all_products, 'filter': product_filter, 'carts' : carts, 'cartItems':cartItems})

#filter category products
def filterProductsByCategory(request, categoryId):
    favs_list = []

    products = Product.objects.filter(cakeCategory_id=categoryId)
    category = CakeCategory.objects.filter(id=categoryId)
    favouriteItems = FavouritesItem.objects.all()
    carts = Cart.objects.all()
    cartItems = CartItem.objects.all()
    product_filter = productFilter(request.GET, queryset=products)
    cartNum = CartItem.objects.count()
    categories = CakeCategory.objects.all()
    for product in products:
        for fav in favouriteItems:
            if product.id == fav.product_id:
                favs_list.append(product.id)
    return render(request, 'filterProductsByCategory.html', {'cartNum':cartNum, 'category':category, 'categories':categories, 'favouriteItems':favs_list, 'products':products, 'filter': product_filter, 'carts' : carts, 'cartItems':cartItems})
#filter function
def filter(request):    
    product_list = Product.objects.all()
    carts = Cart.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    categories = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()
    return render(request, "filter.html", {'cartNum':cartNum, 'filter': product_filter, 'categories': categories})

#login view for registered users
def login_view(request):
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    categories = CakeCategory.objects.all()
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None and user.is_authenticated:
            oldCart = Cart.objects.filter(user_id = user.id)
            
            if oldCart != None:
                oldCart.delete()
                auth_logout(request)
                cart = Cart(user_id = user.id, created_at =datetime.datetime.now())
                cart.save()
            login(request, user)
            
            return redirect('homePage') 

    return render(request, 'login.html', {'filter': product_filter, 'categories': categories})  # incorrect login try again

#logout view - need to delete user cart before logout 
def logout(request, userId):
    cart = Cart.objects.filter(user_id = userId)
    cart.delete()
    auth_logout(request)
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    categories = CakeCategory.objects.all()
    return redirect("homePage");

# add new user view 
@admin_required # only admin can add new user
def addUser(request):
    if request.method == 'GET':
        product_list = Product.objects.all()
        product_filter = productFilter(request.GET, queryset=product_list)
        user_form = userForm()
        categories = CakeCategory.objects.all()
        return render(request, 'addUser.html', {"filter":product_filter, 'form':user_form, 'categories':categories})
    elif request.method == 'POST':
        user_form = userForm(request.POST)
        if user_form.is_valid():
            user_form.save()
            return redirect('homePage')
        else:
            return HttpResponseNotAllowed()

# add category 
@admin_required # only admin can add new user
def addCategory(request):
    if request.method == 'GET':
        categoryForm = cakeCategoryForm()
        product_list = Product.objects.all()
        product_filter = productFilter(request.GET, queryset=product_list)
        categories = CakeCategory.objects.all()
        return render(request, 'addCategory.html', {"filter":product_filter, 'form':categoryForm, 'categories':categories})
    elif request.method == 'POST':
        categoryForm = cakeCategoryForm(request.POST)
        if categoryForm.is_valid():
            categoryForm.save()
            categories = CakeCategory.objects.order_by('name')
            products = Product.objects.all()
            product_filter = productFilter(request.GET, queryset=products)
            categories = CakeCategory.objects.all()

            counter = 0
            category_ids = []
            orderProducts = []

            for category in categories:
                counter = 0
                for product in products:
                    if category.id == product.cakeCategory_id:
                        category_ids.append(category.id)
                    if category.id == product.cakeCategory_id and counter < 4:
                        orderProducts.append(product)
                        counter += 1
            return redirect('listCategory')

        else:
            return HttpResponseNotAllowed()

# add new Product view 
@admin_required # - only admin can add new product
def addProduct(request, cakeCategoryId):
    categories = CakeCategory.objects.all()
    if request.method == 'GET':
        form = productForm()
        product_list = Product.objects.all()
        product_filter = productFilter(request.GET, queryset=product_list)
        return render(request, 'addProduct.html', {"filter":product_filter, 'form':form, 'categories':categories})
    elif request.method == 'POST':
        form = productForm(request.POST, request.FILES or None)
        if form.is_valid():
            newProduct = Product(name=form.cleaned_data['name'], price=form.cleaned_data['price'], description=form.cleaned_data['description'], image=form.cleaned_data['image'], update_on=form.cleaned_data['update_on'], cakeCategory_id=cakeCategoryId)
            newProduct.save()
            return redirect("homePage")
        else:
            product_filter = productFilter(request.GET, queryset=product_list)
            return render(request, 'addProduct.html', {'filter':product_filter, 'form':form, 'categories':categories})
    else:
        return HttpResponseNotAllowed()

# list categories
@admin_required
def listCategory(request):
    categories = CakeCategory.objects.order_by('name')
    products = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=products)
    categories = CakeCategory.objects.all()

    counter = 0
    category_ids = []
    orderProducts = []

    for category in categories:
        counter = 0
        for product in products:
            if category.id == product.cakeCategory_id:
                category_ids.append(category.id)
            if category.id == product.cakeCategory_id and counter < 4:
                orderProducts.append(product)
                counter += 1
    return render(request, 'listCategory.html', {'ids':category_ids, 'orderProducts':orderProducts, 'categories':categories, 'filter':product_filter, 'categories':categories, 'products':products})

# registration view
def register(request):
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    categories = CakeCategory.objects.all()
    if request.method == 'GET':
        user_form = userForm()
        return render(request, 'register.html', {'filter':product_filter,'form':user_form, 'categories':categories})
    elif request.method == 'POST':
        user_form = userForm(request.POST)
        if user_form.is_valid():
            user_form.save()
            return redirect('login')
        else:
            return render(request, 'register.html', {'filter':product_filter, 'form':user_form, 'categories':categories})
    else:
        return HttpResonseNotAllowed()

# update Product view 
@admin_required
def productUpdate(request, productId):
    product = Product.objects.get(id=productId) 
    if request.method == 'GET':
        product_data = productForm(instance=product)
        product_list = Product.objects.all()
        product_filter = productFilter(request.GET, queryset=product_list)
        categories = CakeCategory.objects.all()
        return render(request, 'productUpdate.html', {'form':product_data, 'filter':product_filter, 'categories':categories}) 
    elif request.method == 'POST':
        product_data = productForm(request.POST, request.FILES or None, instance=product)
        if product_data.is_valid():
            product_data.save()
            return redirect("homePage")

# update User view 
@login_required
def userUpdate(request, userId):
    user = User.objects.get(id=userId) 
    cartNum = CartItem.objects.count()
    product_list = Product.objects.all()
    if request.method == 'GET':
        user_data = userForm(instance=user)
        product_filter = productFilter(request.GET, queryset=product_list)
        categories = CakeCategory.objects.all()
        return render(request, 'userUpdate.html', {'cartNum':cartNum, 'form':user_data, 'filter':product_filter, 'categories':categories}) 
    elif request.method == 'POST':
        user_data = userForm(request.POST, instance=user)
        if user_data.is_valid():
            user_data.save()
            return redirect("homePage")

# delete product
@admin_required
def deleteProduct(request, productId):
    product = Product.objects.get(id=productId)
    product.delete()
    return redirect ('homePage')

# delete category type
@admin_required
def deleteCategory(request, categoryId):
    category = CakeCategory.objects.get(id=categoryId)
    category.delete()
    return redirect ('listCategory')

@admin_required
# delete User
def deleteUser(request, userId):
    user = User.objects.get(id=userId)
    user.delete()
    return redirect ('listUsers')  

# searching functionality view
def searchProduct(request): 
    favs_list = []
    category_ids = []
    orderProducts = []
    userFavs = []
    counter = 0

    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    carts = Cart.objects.all()
    cartItems = CartItem.objects.all()
    favouriteItems = FavouritesItem.objects.all()
    categories = CakeCategory.objects.all().order_by('name')
    cartNum = CartItem.objects.count()

    if request.method == 'POST':
        product_name =  request.POST.get('search')      
        try:
            status = Product.objects.filter(name__icontains=product_name) or Product.objects.filter(description__icontains=product_name) or Product.objects.filter(price__icontains=product_name) or Product.objects.filter(category__icontains=product_name)

            for product in status:
                for fav in favouriteItems:
                    if product.id == fav.product_id:
                        favs_list.append(product.id)
            if request.user.is_authenticated:
                for fav in favouriteItems:
                    if request.user.id == fav.user_id:
                        userFavs.append(fav.product_id)
            for product in status:
                for fav in favouriteItems:
                    if product.id == fav.product_id:
                        favs_list.append(product.id)

        except Product.DoesNotExist:
            status = None
       
        return render(request, 'searchResult.html', {'userFavs':userFavs, 'cartNum':cartNum, 'orderProducts': status, 'ids': category_ids, 'categories':categories, 'favouriteItems':favs_list, 'products':status, 'filter': product_filter, 'carts' : carts, 'cartItems':cartItems})
    else:
        for product in product_list:
            for fav in favouriteItems:
                if product.id == fav.product_id:
                    favs_list.append(product.id)
        for product in product_list:
            for fav in favouriteItems:
                if product.id == fav.product_id:
                    favs_list.append(product.id)

        for category in categories:
            counter = 0
            for product in product_list:
                if category.id == product.cakeCategory_id:
                    category_ids.append(category.id)
                if category.id == product.cakeCategory_id and counter < 4:
                    orderProducts.append(product)
                    counter += 1
        return render(request, 'searchResult.html', {'cartNum':cartNum, 'orderProducts': orderProducts, 'ids': category_ids, 'categories':categories, 'favouriteItems':favs_list, 'products':product_list, 'filter': product_filter, 'carts' : carts, 'cartItems':cartItems})


# filter Product functionality 
def search(request):
    product_list = Product.objects.all()
    carts = Cart.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    favouriteItems = FavouritesItem.objects.all()
    categories_all = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()
    categories = []
    favs_list = []
    userFavs = []

    for product in product_list:
            for fav in favouriteItems:
                if product.id == fav.product_id:
                    favs_list.append(product.id)
    if request.user.is_authenticated:
        for fav in favouriteItems:
            if request.user.id == fav.user_id:
                userFavs.append(fav.product_id)

    for category in categories_all:
        for product in product_filter.qs:
            if product.cakeCategory_id == category.id:
                if category not in categories:
                    categories.append(category)

    
    return render(request, "product_list.html", {'userFavs':userFavs, 'cartNum':cartNum, 'filter': product_filter, "carts":carts, 'categories':categories, 'favouriteItems':favs_list})


# ******************************************************************************************************

#CART VIEWS

# current cart - cart detail
@login_required
@user_required
def listCart(request):
    cart = Cart.objects.all()   
    product_list = Product.objects.all()
    categories = CakeCategory.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    cartNum = CartItem.objects.count()
    return render(request, 'listCart.html', {'cartNum':cartNum, 'filter':product_filter, 'carts':cart, 'categories':categories})

# create cart
@login_required
@user_required
def addCart(request):
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    categories = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()
    if request.method == 'GET':
        cart_form = cartForm()
        return render(request, 'addCart.html', {'cartNum':cartNum, 'form':cart_form, 'filter':product_filter, 'categories':categories})
    elif request.method == 'POST':
        cart_form = cartForm(request.POST)
        if cart_form.is_valid():
            cart_form.save()
            return redirect("homePage")
        else:
            return render(request, 'addCart.html', {'cartNum':cartNum, 'form':cart_form, 'filter':product_filter, 'categories':categories})
    else:
        return HttpResponseNotAllowed()

# update cart
@login_required
@user_required
def cartUpdate(request, cartId):
    product_list = Product.objects.all()
    cart = Cart.objects.get(id=cartId) 
    product_filter = productFilter(request.GET, queryset=product_list)
    categories = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()
    if request.method == 'GET':
        cart_data = cartForm(instance=cart)
        return render(request, 'cartUpdate.html', {'cartNum':cartNum, 'filter':product_filter, 'form':cart_data, 'categories':categories}) 
    elif request.method == 'POST':
        cart_data = cartForm(request.POST, instance=cart)
        if cart_data.is_valid():
            cart_data.save()
            return redirect("homePage")

# delete cart
@login_required
@user_required
def deleteCart(request, cartId):
    cart = Cart.objects.get(id=cartId)
    cart.delete()
    return redirect ('homePage')


#********************************************************************************************************

# cart items list for current user 
@login_required
@user_required
def listCartItems(request, userId):
    userCart = Cart.objects.get(user_id = userId)
    cart = CartItem.objects.filter(cart_id=userCart.id) 
    products = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=products)
    categories = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()
    totalPrice = 0

    for product in products:
        for item in cart:
            if item.product_id == product.id:
                totalPrice += product.price * item.productQuantity

    return render(request, 'listCartItem.html', {'cartNum':cartNum, 'categories':categories, 'filter': product_filter, 'cartItems':cart, 'products':products, 'userCart':cart, 'totalPrice':totalPrice})

# create cart item
@login_required
@user_required
def addCartItem(request, cartId, productId):
    cart = Cart.objects.get(id = cartId)
    carts = CartItem.objects.all()
    product = Product.objects.get(id = productId)
    product_list = Product.objects.all()

    for cartItem in carts:
        if cartId == cartItem.cart_id and productId == cartItem.product_id:
            cartItem = CartItem.objects.filter(product_id=productId,cart_id=cartId).update(productQuantity=cartItem.productQuantity + 1)
            return redirect("listCartItem", cart.user_id)

    cartItem = CartItem(cart_id=cart.id, product_id=product.id, productQuantity=1)
    cartItem.save()
        
    return redirect("homePage")

# remove from quantity 
@login_required
@user_required
def removeCartItem(request, cartId, productId):
    cart = Cart.objects.get(id = cartId)
    carts = CartItem.objects.all()
    product = Product.objects.get(id = productId)
    product_list = Product.objects.all()

    for cartItem in carts:
        if cartId == cartItem.cart_id and productId == cartItem.product_id and cartItem.productQuantity > 1:
            cartItem = CartItem.objects.filter(product_id=productId,cart_id=cartId).update(productQuantity=cartItem.productQuantity - 1)
            return redirect("listCartItem", cart.user_id)
        elif cartItem.productQuantity <= 1:
            cartItem.delete()
            return redirect("listCartItem", cart.user_id)

    cartItem = CartItem(cart_id=cart.id, product_id=product.id, productQuantity=1)
    cartItem.save()
        
    return redirect("listCartItem", cart.user_id)

# update cart item
@login_required
@user_required
def cartItemUpdate(request, cartItemId):
    cartItem = CartItem.objects.get(id=cartItemId) 
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    categories = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()
    if request.method == 'GET':
        cart_data = cartItemForm(instance=cartItem)
        return render(request, 'cartItemUpdate.html', {'cartNum':cartNum, 'filter':product_filter, 'form':cart_data, 'categories':categories}) 
    elif request.method == 'POST':
        cart_data = cartItemForm(request.POST, instance=cartItem)
        if cart_data.is_valid():
            cart_data.save()
            return redirect("homePage")

# delete cart item
@login_required
@user_required
def deleteCartItem(request, cartItemId, userId):
    cartItem = CartItem.objects.get(id=cartItemId)

    cartItem.delete()
    return redirect ('listCartItem', userId)

# buy options 
@user_required
def buy(request, userId):
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    categories = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()
    if request.method == 'POST':
        form = PaymentOptions(request.POST)
        if form.is_valid() and form.cleaned_data['paymentOptions'] == 'cod':
            return redirect('codOrder', userId)
        elif form.is_valid and form.cleaned_data['paymentOptions'] == 'card':
            return redirect('cardPayment', userId)
    elif request.method == 'GET':
        form = PaymentOptions()

        return render(request, 'buy.html', {'cartNum':cartNum, 'filter':product_filter, 'form' : form, 'categories':categories})

# card payment details
@user_required
def cardPayment(request, userId):
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    categories = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()
    error = ""
    if request.method == 'POST':
        form = cardDetails(request.POST)
        today = datetime.date.today()
        if form.is_valid() and form.cleaned_data['expirationDate'] > today:
            return redirect('codOrder', userId)
        else:
            error = "Expiration date cannot be from the past!"
            return render(request, 'cardPayment.html', {'error':error, 'cartNum':cartNum, 'filter':product_filter, 'form' : form, 'categories':categories })

    elif request.method == 'GET':
         form = cardDetails()
         return render(request, 'cardPayment.html', {'cartNum':cartNum, 'filter':product_filter, 'form' : form, 'categories':categories })
    else:
        return HttpResonseNotAllowed()

# cod order
@user_required
def codOrder(request, userId):
    userCart = Cart.objects.get(user_id = userId)
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    cart = Cart.objects.get(user_id = userId) # for specified user 
    carts = CartItem.objects.all() #all item 
    products = Product.objects.all()
    categories = CakeCategory.objects.all()
    userCartItems = CartItem.objects.filter(cart_id=cart.id)  # items from specified cart
    cartNum = CartItem.objects.count()
    if request.method == 'GET':
        form = shippingForm()
        return render(request, 'codOrder.html', {'cartNum':cartNum, 'filter':product_filter, 'form' : form, 'categories':categories})
    elif request.method == 'POST':
        form = shippingForm(request.POST)
        if form.is_valid():
            for product in products:
                for item in userCartItems:
                    if item.product_id == product.id:
                        newShipping = Shipping(details=form.cleaned_data['details'], user_id=userId, product_id=product.id, city=form.cleaned_data['city'], country=form.cleaned_data['country'], street=form.cleaned_data['street'], streetNumber=form.cleaned_data['streetNumber'])
                        newShipping.save()
            return redirect('orderCompleted', userId)
    return redirect('codOrder', userId)
        
# order completed
@user_required
def orderCompleted(request, userId):
    lastOrder = Shipping.objects.all().last()

    cart = Cart.objects.get(user_id = userId) # for specified user 
    carts = CartItem.objects.all() #all item 
    products = Product.objects.all()

    userCartItems = CartItem.objects.filter(cart_id=cart.id)  # items from specified cart

    for product in products:
        for item in userCartItems:
            if item.product_id == product.id:
                orderStatus = OrderStatus(shipping_id=lastOrder.id, product_id=product.id)
                orderStatus.save()
                item.delete()

    return redirect('finishOrder', userId)

# finish order webpage to inform custumer that order is confirmed 
def finishOrder(request, userId):
    return render(request, "finishOrder.html")

# ***********************************************************************************************

# create favourite items
@login_required
@user_required
def addFavouriteItem(request, userId, productId):
    favs = FavouritesItem.objects.all()

    for fav in favs:
        if productId == fav.product_id and userId == fav.product_id:
            return redirect("homePage")

    newProduct = FavouritesItem(product_id=productId,user_id=userId, added_at=datetime.date.today())
    newProduct.save()
        
    return redirect("homePage")

# list favourites items
@login_required
@user_required
def listFavouriteItems(request, userId):
    userItems = FavouritesItem.objects.filter(user_id = userId)
    products = Product.objects.all()
    userCart = Cart.objects.get(user_id = userId)
    cart = Cart.objects.all()
    product_filter = productFilter(request.GET, queryset=products)
    categories = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()
    return render(request, 'listFavouriteItems.html', {'cartNum':cartNum, 'categories':categories, 'filter':product_filter, 'userItems':userItems, 'products':products, 'cartItems':cart})

# remove favourite items
@login_required
@user_required
def removeFavouriteItems(request, userId, productId):
    favs = FavouritesItem.objects.filter(product_id=productId)
   
    favs.delete()
    return redirect("homePage")


#**************************************  TRACKING ******************************************

#see tracking status
@user_required
def tracking(request, userId):
    shipping = Shipping.objects.filter(user_id=userId)
    orderStatus = OrderStatus.objects.all()
    products = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=products)
    sortProducts = Product.objects.all().order_by('name')
    categories = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()

    list = []
    for item in shipping:
        for order in orderStatus:
            if item.id == order.shipping_id:
                list.append(order)
    return render(request, "tracking.html", {"cartNum":cartNum, "categories":categories, "filter":product_filter, "orderStatus":list, "products":products, "sortProducts":sortProducts})

#sort by name ASC  ----> HOME
def orderByName(request):
    all_products = Product.objects.all().order_by('-name')

    favs_list = []
    category_ids = []
    userFavs = []
    orderProducts = []
    counter = 0

    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    carts = Cart.objects.all()
    cartItems = CartItem.objects.all()
    favouriteItems = FavouritesItem.objects.all()
    categories = CakeCategory.objects.all().order_by('name')
    cartNum = CartItem.objects.count()
    
    if request.user.is_authenticated:
        for fav in favouriteItems:
            if request.user.id == fav.user_id:
                userFavs.append(fav.product_id)

    for product in all_products:
        for fav in favouriteItems:
            if product.id == fav.product_id:
                favs_list.append(product.id)

    for category in categories:
        counter = 0
        for product in all_products:
            if category.id == product.cakeCategory_id:
                category_ids.append(category.id)
            if category.id == product.cakeCategory_id and counter < 4:
                orderProducts.append(product)
                counter += 1
        
    return render(request, 'home.html', {'cartNum':cartNum, 'userFavs':userFavs, 'orderProducts': orderProducts, 'ids': category_ids, 'categories':categories, 'favouriteItems':favs_list, 'products':all_products, 'filter': product_filter, 'carts' : carts, 'cartItems':cartItems})


# sort by city  ----> TRACKING
@login_required
def orderByCity(request, userId):
    shipping = Shipping.objects.filter(user_id=userId).order_by('city')
    orderStatus = OrderStatus.objects.all()
    products = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=products)
    sortProducts = Product.objects.all().order_by('name')
    categories = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()

    list = []
    for item in shipping:
        for order in orderStatus:
            if item.id == order.shipping_id:
                list.append(order)
    return render(request, "tracking.html", {"cartNum":cartNum, "categories":categories, "filter":product_filter, "orderStatus":list, "products":products, "sortProducts":sortProducts})


#sort by date   ----> TRACKING
@login_required
def orderByDate(request, userId):
    shipping = Shipping.objects.filter(user_id=userId).order_by('update_on')
    orderStatus = OrderStatus.objects.all()
    products = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=products)
    sortProducts = Product.objects.all().order_by('name')
    categories = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()

    list = []
    for item in shipping:
        for order in orderStatus:
            if item.id == order.shipping_id:
                list.append(order)
    return render(request, "tracking.html", {"cartNum":cartNum, "categories":categories, "filter":product_filter, "orderStatus":list, "products":products, "sortProducts":sortProducts})


# list all users sorted by name ASC   ----> listUsers
@login_required
@admin_required
def listUsers(request):
    users = User.objects.all()
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    categories = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()
    if request.method == 'GET':
        form = sortUser()

    elif request.method == 'POST':
        form = sortUser(request.GET)

        if form.is_valid() and form.cleaned_data['sort'] == 'firstnameASC':
            users = User.objects.order_by('firstName')
            form = sortUser()
            return render(request, 'listUsers.html', {"cartNum":cartNum, "form":form, "filter":product_filter, "users":users, "categories":categories}) 
        elif form.is_valid() and form.cleaned_data['sort'] == 'firstnameDESC':
            users = User.objects.order_by('-firstName')
            form = sortUser()
            return render(request, 'listUsers.html', {"cartNum":cartNum, "form":form, "filter":product_filter, "users":users, "categories":categories}) 
        elif form.is_valid() and form.cleaned_data['sort'] == 'lastnameASC':
            users = User.objects.order_by('lastName')
            form = sortUser()
            return render(request, 'listUsers.html', {"cartNum":cartNum, "form":form, "filter":product_filter, "users":users, "categories":categories}) 
        elif form.is_valid() and form.cleaned_data['sort'] == 'lastnameDESC':
            users = User.objects.order_by('-lastName')
            form = sortUser()
            return render(request, 'listUsers.html', {"cartNum":cartNum, "form":form, "filter":product_filter, "users":users, "categories":categories}) 
        elif form.is_valid() and form.cleaned_data['sort'] == 'addressASC':
            users = User.objects.order_by('address')
            form = sortUser()
            return render(request, 'listUsers.html', {"cartNum":cartNum, "form":form, "filter":product_filter, "users":users, "categories":categories}) 
        elif form.is_valid() and form.cleaned_data['sort'] == 'addressDESC':
            users = User.objects.order_by('-address')
            form = sortUser()
            return render(request, 'listUsers.html', {"cartNum":cartNum, "form":form, "filter":product_filter, "users":users, "categories":categories}) 
 
    return render(request, 'listUsers.html', {"cartNum":cartNum, "filter":product_filter, "users":users, "categories":categories, "form":form}) 
 

# update tracking status
@login_required
@admin_required
def statusUpdate(request):
    products = Product.objects.all()
    items = OrderStatus.objects.all()
    shipping = Shipping.objects.all()
    product_filter = productFilter(request.GET, queryset=products)
    categories = CakeCategory.objects.all()
    cartNum = CartItem.objects.count()
    sortedProducts = []
    if request.method == 'GET':
        form = sort()
    elif request.method == 'POST':
        form = sort(request.POST)
        if form.is_valid() and form.cleaned_data['sort'] == 'nameASC':
            shipping = Shipping.objects.order_by('product__name')
            form = sort()
            return render(request, 'statusUpdate.html', {"cartNum":cartNum, "filter":product_filter, "categories":categories, "form":form, "shipping":shipping, "products":products, "items":items})
        elif form.is_valid and form.cleaned_data['sort'] == 'nameDESC':
            shipping = Shipping.objects.order_by('-product__name')
            form = sort()
            return render(request, 'statusUpdate.html', {"cartNum":cartNum, "filter":product_filter, "categories":categories, "form":form, "shipping":shipping, "products":products, "items":items})
        elif form.is_valid and form.cleaned_data['sort'] == 'cityASC':
            shipping = Shipping.objects.order_by('city')
            form = sort()
            return render(request, 'statusUpdate.html', {"cartNum":cartNum, "filter":product_filter, "categories":categories, "form":form, "shipping":shipping, "products":products, "items":items})
        elif form.is_valid and form.cleaned_data['sort'] == 'cityDESC':
            shipping = Shipping.objects.order_by('-city')
            form = sort()
            return render(request, 'statusUpdate.html', {"cartNum":cartNum, "filter":product_filter, "categories":categories, "form":form, "shipping":shipping, "products":products, "items":items})
        
        elif form.is_valid and form.cleaned_data['sort'] == 'update':
             items = OrderStatus.objects.order_by('update_on')
             form = sort()
             return render(request, 'statusUpdate.html', {"cartNum":cartNum, "filter":product_filter, "categories":categories, "filter":product_filter, "form":form, "shipping":shipping, "products":products, "items":items})
  
    return render(request, 'statusUpdate.html', {"cartNum":cartNum, "categories":categories, "filter":product_filter, "shipping":shipping, "products":products, "items":items, "form":form}) 
 

# update tracking status
@login_required
@admin_required
def statusEdit(request, orderStatusId):
    item = OrderStatus.objects.get(id=orderStatusId)
    cartNum = CartItem.objects.count()

    if request.method == 'GET':
        form = orderStatusForm(instance=item)
        product_list = Product.objects.all()
        product_filter = productFilter(request.GET, queryset=product_list)
        categories = CakeCategory.objects.all()
        return render(request, 'statusEdit.html', {"cartNum":cartNum, "filter": product_filter, 'form':form, "categories":categories}) 
    elif request.method == 'POST':
        form = orderStatusForm(request.POST, instance=item)
        if form.is_valid():
            form.save()
        return redirect("statusUpdate")

#user confirm that recieved order
@user_required
def userConfirmed(request, orderId, userId):
    order = OrderStatus.objects.get(id=orderId)
    order.delete()
    return redirect('tracking', userId)

def aboutUs(request):
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    return render(request, 'aboutUs.html', {'filter':product_filter})

def privacyPolicy(request):
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    return render(request, 'privacyPolicy.html', {'filter':product_filter})

def terms(request):
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    return render(request, 'terms.html', {'filter':product_filter})

def help(request):
    product_list = Product.objects.all()
    product_filter = productFilter(request.GET, queryset=product_list)
    return render(request, 'help.html', {'filter':product_filter})