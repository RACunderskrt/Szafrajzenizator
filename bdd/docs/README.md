# Station essence API Documentation

  

Station essence est une API qui permet de consulter et modifier des différentes stations avec les différents prix des essences présents dans cette station.
Pour utiliser l'API, il faut lancer les 2 serveurs en simultanés avec les commandes : <br>
- node index.js &rarr; Partie Station essence qui écoute sur le port 4000.
- node indexAuth.js &#8594; Partie authentification et JWT qui écoute le port 5000.

  

# Comptes

  

Pour accèder à l'API, il faut s'être authentifier au préalable.

  

## Rôles

  

Chaque compte possède un nombre d'autorisation. <br>

Ces autorisations permettent de gérer l'accès au différentes fonctions de l'API en séparant les labels de carburants et les stations ainsi qu'au visionnage ou à la modification des données.

# Routes
## Labels 
### Liste tous les labels - [ GET ]
___
Lien : /label
\+ Response 200 
```
[   
	{  
	"id": 2, 
	"name": "DIESEL"  
	},  
	{  
		"id": 3, 
		"name": "SP98"  
	}, 
	... 
]
```
### Liste un label - [ GET ]
___
Lien : /label/:id
\+ Response 200 
```   
{  
	"id": 2, 
	"name": "DIESEL"  
}   
```
### Créer un label - [ POST ]
___
Créer un label avec les données du body.
Lien : /label
\+ Response 200
```   
{  
	"id": 15, 
	"name": "SP102"  
}   
```
### Modifier un label - [ PUT ]
___
Modifie le label avec les données du body.
Lien : /label
\+ Response 200
```   
{  
	"id": 2, 
	"name": "GAZOIL"  
}   
```

### Supprimer un label - [ DELETE ]
___
Supprime le label à l'id indiqué.
Lien : /label/:id
\+ Response 200

## Labels 
### Liste toutes les stations - [ GET ]
___
Lien : /station
\+ Response 200 
```
[   
  {  
	  "id": 1,  
	  "name": "La station des potiers",  
	  "address": "3 rue des potiers",  
	  "CP": 81735,  
	  "city": "Oui",  
	  "carburants": [  
		  {  "label": {  "id": 4,  "name": "SP95"  },  "price": 1.87  },  
		  {  "label": {  "id": 3,  "name": "SP98"  },  "price": 1.95  },  
		  {  "label": {  "id": 2,  "name": "DIESEL"  },  "price": 1.85  }  
	  ]  
  },  
  {  
	  "id": 2,  
	  "name": "La station d'Albert",  
	  "address": "8 avenue Albert Camus",  
	  "CP": 15875,  
	  "city": "Merre",
	... 
  }
]
```
### Liste une station - [ GET ]
___
Lien : /station/:id
\+ Response 200 
```   
{  
  "id": 1,  
  "name": "La station des potiers",  
  "address": "3 rue des potiers",  
  "CP": 81735,  
  "city": "Oui",  
  "carburants": [  
	  {  "label": {  "id": 4,  "name": "SP95"  },  "price": 1.87  },  
	  {  "label": {  "id": 3,  "name": "SP98"  },  "price": 1.95  },  
	  {  "label": {  "id": 2,  "name": "DIESEL"  },  "price": 1.85  }  
  ]  
 }   
```
### Créer une station - [ POST ]
___
Créer un station avec les données du body.
Lien : /station
\+ Response 200
```   
{  
	  "id": 4,  
	  "name": "La station de la liberation",  
	  "address": "3 impasse de la liberation",  
	  "CP": 25986,  
	  "city": "Liberation",  
	  "carburants": [  
		  {  "label": {  "id": 5,  "name": "E100"  },  "price": 1.78  },
	  ]  
}   
```
### Modifier une station - [ PUT ]
___
Modifie le station avec les données du body.
Lien : /station
\+ Response 200
```   
{  
	  "id": 4,  
	  "name": "La station de la liberation",  
	  "address": "5 impasse de la liberation",  
	  "CP": 25986,  
	  "city": "Liberation",  
	  "carburants": [  
		  {  "label": {  "id": 5,  "name": "E100"  },  "price": 1.78  },
		  {  "label": {  "id": 7,  "name": "GPL"  },  "price": 1.40  },
	  ]  
}    
```

### Supprimer une station - [ DELETE ]
___
Supprime le station à l'id indiqué.
Lien : /station/:id
\+ Response 200

## Comptes
### Se connecter - [ POST ]
---
Retourne un access token et un refresh token lorsque l'utilisateur s'authentifie avec les données du body.
Lien: /login
\+ Response 200
``` 
body  
{  
	"id": 15, 
	"name": "SP102"  
}
response
{  
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJWSUVXX1NUQVRJT04iLCJWSUVXX0xBQkVMIiwiQ0hBTkdFX0xBQkVMIiwiQ0hBTkdFX1NUQVRJT04iXSwiaWF0IjoxNzAyMzE3NTQ4LCJleHAiOjE3MDIzMTgxNDh9.3AWcj9RjPvBqDb-60FjX6K2MF95wcuGxy8_SNwd3aho",  
	"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJWSUVXX1NUQVRJT04iLCJWSUVXX0xBQkVMIiwiQ0hBTkdFX0xBQkVMIiwiQ0hBTkdFX1NUQVRJT04iXSwiaWF0IjoxNzAyMzE3NTQ4fQ.cnvszV13ixjM4aJ_Z8zT0S0BVHdJYLmQOAHMuvhAYbc"  
} 
```
### Recréer un token - [ POST ]
---
Retourne un access token grâce au refresh token dans le body.
Lien: /token
\+ Response 200
``` 
body  
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidmlld0wiLCJyb2xlcyI6WyJWSUVXX0xBQkVMIl0sImlhdCI6MTcwMjMwOTA5M30.7ijz9spYXHDxjQzk0P9xI25Jn_9W3jms5A-0ZVxk7YQ"
}
response
{  
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJWSUVXX1NUQVRJT04iLCJWSUVXX0xBQkVMIiwiQ0hBTkdFX0xBQkVMIiwiQ0hBTkdFX1NUQVRJT04iXSwiaWF0IjoxNzAyMzE3NzgxLCJleHAiOjE3MDIzMTgzODF9._6qFp4f2r9Xr84RG4qtl_VEJx7UfZbGFnvv91pFIPMA"  
} 
```
### Se déconnecter - [ DELETE ]
---
Rend inutilisable le refresh token pour recréer des access token.
Lien: /logout
\+ Response 200
``` 
body  
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidmlld0wiLCJyb2xlcyI6WyJWSUVXX0xBQkVMIl0sImlhdCI6MTcwMjMwOTA5M30.7ijz9spYXHDxjQzk0P9xI25Jn_9W3jms5A-0ZVxk7YQ"
}
```