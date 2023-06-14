from string import ascii_uppercase as alphabet
import re

# ZADATAK:  https://community.topcoder.com/stat?c=problem_statement&pm=14579

class EllysWordCoins:
    market = []
    graph = {}
           
    def __init__(self, market):
        self.setMarket(market)
        self.market_to_graph()
        
    # setiranje marketa splitanjem elemenata
    def setMarket(self, market):
        for element in market:
            self.market.append(element.split(" ")) # splitanje po razmaku da se dobije ureden par izmedu od w1 i w2
        
    #iz liste u graf 
    def market_to_graph(self):
        for element in self.market:
            neighbours = [(word[1], word_distance(word[0], word[1])) for word in self.market if element[0] == word[0]]
            
            self.graph[element[0]] = neighbours #word[0] je rijec koja se treba podudarati da se moze zamijeniti sa rijeci word[1]
    
    def dfs(self, node, visited=[]):
        visited.append(node)
            
        if node in self.graph.keys():
            for neighbour in self.graph[node]:
                if neighbour[0] not in visited:
                    self.dfs(neighbour[0], visited)

        return visited
    
    def isConnected(self, start, stop):
        visited = self.dfs(start)
        if start in visited and stop in visited:  # moze li se doci od minimuma do zeljene rijeci
            return True
        return False
    
    # pomocu razlike pronadi rijec
    def find_word(self, value):
        for key, values in self.graph.items():
            for item in values:
                if item[1] == value:
                    return item[0]
                
    # pronalazi rijec sa najmanjom razlikom u dolarima
    def minimum(self, values, stop):
        min_element = min(values)
        
        while not self.isConnected(self.find_word(min_element), stop):   # trazi dok ne postoji povezanost 
            values.remove(min_element)
            min_element = min(values)
        return min_element
    
    def min_neighbour(self, path, stop): # trazi susjeda sa najmanjom tezinom
        values = [value for value in path.values()] #lista susjeda
        
        min_element = self.minimum(values, stop) #susjed najmanje tezine
        
        for key, value in path.items():
            if int(value) == min_element:
                return key, min_element #vratimo vrh i brid onog brida najmanje tezine
            
    # susjedi koji su neposjeceni 
    def unvisited_neighbours(self, neighbours, visited, stop):
        unvisited = {}
        
        for neighbour in neighbours:
           if neighbour[0] not in visited and neighbour[0] in self.graph.keys() or neighbour[0] == stop: # ako nije u visited dodaj ga
               unvisited[neighbour[0]] = neighbour[1]
           
        return self.min_neighbour(unvisited, stop) #vrati najmanji trenutni neposjeceni
    
    # trazenje puta do rijeci 
    def getCoast(self, start, stop):
        visited = []
        
        visited.append(start)
        currentWord = -1
        sum_distance = 0
        
        while visited[-1] != stop:
            currentWord = visited[-1] # uzima se zadnji element iz visited
            node, distance = self.unvisited_neighbours(self.graph[currentWord], visited, stop) #traze se njegovi neposjeceni susjedi
            visited.append(node) # spremimo vrh u posjecene 
            sum_distance += distance #dodamo udaljenost u sumu
            
        return visited, sum_distance
    
class Person:
    def __init__(self, owns, trade):
        self.owns = owns
        self.trade = trade
        
    #provjera parametara
    def check_params(self):
        if len(self.owns) == 0 or len(self.owns) > 20 or len(self.trade) == 0 or len(self.trade) > 20:
            return False
        if not bool(re.match("[A-Z]+", self.owns)) or not bool(re.match("[A-Z]+", self.trade)):
            return False
        return True   
        
# svako slovo ima vrijednost u dollarima ASCII 
def word_in_dollars():
     alpha_values = {} # rijecnik koji za svako slovo sadrzi vrijednost u dolarima
     
     for c in range(len(alphabet)):
         alpha_values[alphabet[c]] = c + 1
         
     alpha_values['_'] = 0 # dodavanje _ koji vrijedi 0 dolara
     
     return alpha_values
 
# vrati uzlazni par od dvije rijeci
def find_smaller(word1, word2):
     return (word1, word2) if len(word1) < len(word2) else (word2, word1) #vrati manji pa veci
 
# dodavanje _ dok duljina rijeci ne bude jednaka
def add_underscors(word1, word2):
     smaller, bigger = find_smaller(word1, word2)
     underscores = ""
     
     for word in range(len(bigger) - len(smaller)):
         underscores += '_' # dodavanje _ u novi niz
         
     return smaller + underscores #konkatenacija stringova
 
# dohvacanje vrijednosti dolara za char
def find_dollar_value(char):
     values = word_in_dollars()
     
     for key, value in values.items(): #key je slovo, value je vrijednost dolara
         if key == char:
             return value
         
# racunanje razlike
def word_distance(word1, word2):
     total_dollars = 0
     if len(word1) < len(word2): #smaller je word1
         temp1 = add_underscors(word1, word2)
         temp2 = word2
     elif len(word2) < len(word1):
         temp2 = add_underscors(word1, word2)
         temp1 = word1
     else:
         temp1 = word1
         temp2 = word2
         
     for char in range(len(temp2)):
         total_dollars += find_dollar_value(temp2[char]) - find_dollar_value(temp1[char]) 
         
     return total_dollars   

#provjera duljine marketa
def check_market_len(market):
    return True if len(market) > 1 and len(market) < 1000 else False

#provjera duljine 
def check_element(market):
    for element in market:
        if len(element) < 3 or len(element) > 41:
            return False 
        if not bool(re.match("[A-Z]+ [A-Z]+", element)):
            return False
        
    return True

# provjera uvjeta marketa
def check_market(market):
    if not check_market_len(market):
        return False
    if not check_element(market):
        return False
    return True 
    
def main():
    market = ["TOPCODER OPEN", "SOURCE CODE", "CHALLENGE POINTS", "POINTS OPEN", "QUAL ROUND",
              "ROUND CHALLENGE", "QUAL FUN", "FUN TOPCODER", "OPEN FINAL", "OPEN SOURCE", "CODE FINAL"]

    #market = ["ESPRIT CGFRVR"]
    #market = ["I CODE", "CODE THEREFORE", "THEREFORE AM"]
    ellyscoins = EllysWordCoins(market);
    #print(ellyscoins.graph)
    
    if not check_market(market):
        return
    
    person = Person("QUAL", "FINAL")
    
    if not person.check_params():
        return 
    
    path, total_sum = ellyscoins.getCoast(person.owns, person.trade)
    
    print("Total cost: ", total_sum, "$")
    print("Path: ", path)
    
if __name__=='__main__':
    main()