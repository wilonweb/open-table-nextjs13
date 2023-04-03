# Projet Next JS Table

Revoir
cf [difference server et client components](https://cdn-images-1.medium.com/max/1600/1*y2CfHt8J8FBkNiUA3Fp-0w.png)

Différence entre use Effect/reducer/state

Quel components est un client et quel un server et ecrire un article sur quand utiliser un et l'autre.

Définir ce qu'est un layout et les layout du projet.

Qu'est ce que le data fetching ?

## Intro

## Créer NextApp

version 13.1.1 avec typescript sans EsLint
npm run dev pour lancer l'application sur le localhost:3000
App>page.tsx est le composant react qui contient la page d'acceuil

## Ajout de TailWind

cf [DOC](https://tailwindcss.com/docs/installation)

npm install -D tailwindcss@3.2.4 postcss@8.4.20 autoprefixer@10.4.13

npx tailwindcss init -p qui initialise tailwind et ajoute 2 fichier :

- postcss.config.js
- tailwind.config.js
  - on ajoute le path des composant et on définis les extenssions js, tsx, etc ... pour que les composant accept tailwindcss

on ajoute les directive au composant app>globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

puis j'ajoute une className pour verifier que ça fonctionne dans page.tsx

on modifie les size dans taillwind.config.js

## File Base Routing

On importe les template html dans le dossier html

On associe les route a un template html :

- opentable.ca = homePage.html
- opentable.ca/search = searchPage.html
- opentable.ca/reastaurant/shakeshack = restaurantDetailsPage.html
- opentable.ca/reastaurant/shakeshack/menu = restaurantMenuPage.html
- opentable.ca/reserve/shakeshack = reservationPage.html

Pour les nom des restaurant on les pace dans un dossier nommé [slug]

puis on implemente les route avec le fichier html associé avec le **File Based Routing**

## Navigation across pages

On a importer les different template html et maitenant nous allons créer un systeme de naviguation

La documentation nous dis qu'il y a 2 façon de faire.

- link components
- useRouter Hook

#Question C'est quoi la difference entre link component et useRouter Hook

### Link components

sur notre menu/page.tsx on importe Link component
puis on change les <a> en <Link> et on définis le path du composant qu'on veut afficher

Ensuite on définis le userRouter Hook

### userRouter hook

Dans App/page.tsx on import useRouter et useState

On créer la const router,
et le state avec location, setlocation.
On définis l'evenement onClick dans le boutton let's go avec l'algoritme pour rechercher

## Travailler avec les composants.

On sépare nos componants en créant un dossier components dans app avec les fichier :
App > components :

- Header.tsx : reprend le state location, setLocation
- Navbar.tsx
- RestaurantCard

App > search > components :

- Header.tsx
- RestaurantCard
- SearchSidebar

App > Restaurant > slug > components :

- Header.tsx
- RestaurantNavBar.tsx
- Images
- Rating
- ReservationCard
- Reviews
- Title

On télécharge les extenssions

- React de dsznajder
- Simple React snippets de Burke Holland ( pour faire des racourci ex rfc )

## Server VS client components

### Rendering Methods

Pour avoir le html on peut passer par le **client side rendering** ou le **server side rendering**

On peut avoir des **client components** et des **server components**

Le server components et le components par default.
il permet une meilleur performance et a acces au backend

le client components utilise le "use client" directive en début de script pour convertir le composant en client.
On l'utilise quand il y a besoin d'un hook comme useState et useEffect useReducer
D'interaction onClick(), onChange()
Faire des HTTP Request.
Utiliser les React Class components

cf [difference server et client components](https://cdn-images-1.medium.com/max/1600/1*y2CfHt8J8FBkNiUA3Fp-0w.png)

Et revoir les difference entre le client components et server components.

Maintenant nous allons voir lesquel de nos composant sont des client et lesquel sont des server components.

App>components>Header
On récupere la partie Search Bar avec les hooks et le use client et on met tout ça dans un nouveaux composant App>components>searchBar.tsx

Ensuite on importe egalement la searchBar dans le composant App>search>components>Header.tsx

## Layouts

Pour appliquer le principe DRY ( don't repeat yourself ) on peut reperer les balise contenant les meme classe taillWind.css.
C'est interessant dans le cas ou on veut changer une couleur, au lieu de devoir changé la couleur dans tout les composants on les change qu'une seul fois

Par default dans notre dossier app on a un fichier Layout.tsx

On commence par insérer la nav qu'on retrouve dans

- app/page.tsx
- app/search>page.tsx

PS quand un composant n'a pas de balise qu'on l'entoure on peut insérer un fragment avec `<>...</>`

Ensuite on créer un second layout dans Restaurant/slug
Pour définir un layout pour le sous-menu des restaurant.
Et on utilise le {children} props pour les composant imbriquer.

Puis on a mis a jour les metadonné head pour changer le nom qui apparait sur l'onglet du navigateur selon la page que l'on visite.

## Fetching Data in Server Components

### A little SQL Lesson

Pour créer une application dynamique, il est important de récupérer les données depuis une base de données externe plutôt que de les coder en dur dans le JSX.

Nous allons voir comment stocker et organiser les donnée avec PostgressSQL et lier les différents table avec une clé primaire (id) pour obtenir des donnéee pertinentes.
exemple : les table des restaurant avec les tables des menus.

Pour relier Le "tableau des menu" avec la tableau des restaurant il faut ajouter une clé étrangere "restaurant_id" au "tableau des menu' dans laquel la valeur est la clé primaire id du "tableau des restaurant"

### Connecting to a Postgress Database

Dans cette video on vois comment utiliser Postgress avec Prisma.

On vas réer une instance Postress hebergé sur un serveur par exemple un container Docker mais on vas utiliser Supabase un service as a backend similaire a Firebase pour generer un mot de passe de base de donnée et le collé dans son code pour se connecter a postgress.
On vas utiliser un ORM ( object relation mapping ) au lieux d'ecrire des requette SQL.
Prisma est le meilleur ORM du marché pour typescript. Il permet de faciliter l'écriture de requêtes, les migrations et la définition des tables avec leur structure.
Pour se connecter à la base de données à partir de l'application, on peut initialiser un projet Prisma, connecter à la base de données en fournissant l'URL de la base de données, qui se trouve dans une variable d'environnement. Il faut ensuite modifier le mot de passe et on peut copier la chaîne de connexion depuis Supabase et la coller dans l'application.

- On commence par s'inscrire sur supabase
- Puis on créer un projet OpenTables
- On copie le password de notre projet et on l'écris en commentaire dans le code.
- On install prima : npm
  install prisma@4.8.1
- on initialise prima : npx prisma init
- On vas sur le site de Prisma>ProjectSetting>Databse et on copie le connection string pour le coller dans le fichier .env
- On modifier le [PASSWORD] avec celui qu'on a coller dans notre projet précédement

Maintenant on a connecter notre application a notre BDD

### Defining SQL Scheme

On créer les tables nécessaires pour stocker les données. Pour chaque restaurant, il faut une table avec un ID en tant que clé primaire.

On créer une table pour les items avec un nom, un prix et une description, et de lier chaque item à un restaurant avec une clé étrangère.

Il y a des tables pour les emplacements et les cuisines, qui sont liés à chaque restaurant avec des clés étrangères.

Il restera d'autres tables à ajouter pour des informations telles que les avis, mais pour l'instant, il se concentrera sur ces tables principales.

#### Restaurant

- id
- name
- main_img
- description
- open-time
- close_time
- slug
- price
- location_id
- cuisine_id

#### Items

- id
- price
- description
- restaurant_id

#### Location

- id
- name

#### Cuisine

- id
- name

On telecharge l'extenssion Prisma pour avoir le highlight dans schema.prisma

On créer notre model dans schema.prisma ( Prendre cours PostGresSQL)

Puis on push le model avec la commande : `npx prisma db push`

Et on verifie dans le Supabase>table_editor que les tables sont bien créé.

### Seeding our database

On ajoute les donnée initial du projet a l'aide d'un fichier seed.ts que l'on place dans le dossier pages/API.
Et on vas sur localhost:3000/API/seed pour lancer le processus de remplissage de données.

Maintenant que la base de donnée est remplis on peut l'intéroger dans notre application.

### How we fetch Data in server Components ?

Dans cette section on vois comment récupérer des data a partir d'une BDD pour les utiliser dans une application NextJS.

La methode classique a l'aide d'une requette HTTP qui récupère les data au format JSON

Cependant dans une application NextJS la récupération de donné se fait directement via un ORM ou une requete SQL. Les data sont transmise au composant serveur.
Et une fois que toute les data sont récupéré le composnant serveur est envoyé au client.

Maintenant nous allons voir comment fetch nos data dans notre premier server components.

### Fetching data in server components

Dans cette section nous allons récupérer les donnée des restaurants et les utiliser pour créer une page dynamique avec Prisma.

Pour cela on vas créer une fonction qui stock les donnée dans une variable

Pour cela on ouvre le script app>page.tsx en créant une instance Prisma car par default les composants sont des server-components et n'accepte pas les requetes http.

```javascript
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
/*Ajout de l'import Prisma*/
import { PrismaClient } from "@prisma/client";

/* déclaration de l'instance prisma */
const prisma = new PrismaClient();

/* déclaration de la fonction (avec la methode findmany pour trouver toute les data) et retourner le resultat dans une variable  restaurants */
const fetchRestaurants = async () => {
  const restaurants = await prisma.restaurant.findMany();

  return restaurants;
};

//ajout du async
export default async function Home() {
  /*appelle de la fonction fetchRestaurant qui attend les resultat dans la variable restaurant qu'on affiche avec un console.log*/
  const restaurants = await fetchRestaurants();

  console.log({ restaurants });
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        <RestaurantCard />
      </div>
    </main>
  );
}
```

### Little TypeScript Lesson

Maintenant qu'on a récuperer une variable contenant tout les restaurants on vas itérer afin de retourner une carte pour chaque restaurant en passant par les informations en tant que props.

On vas voir comment utiliser typeScript pour définir des types de props et selectionner les donnée dont on a besoin avec l'option select.

On commence par iterer nos restaurant avec la methode map dans app>page.tsx

```javascript
{
  restaurants.map((restaurant) => <RestaurantCard restaurant={restaurant} />);
}
```

## Question

### Qu'est ce qu'un components ?

### Qu'est ce que le server components, qu'est ce que le clien components ?

### qu'est ce que le use client ?

### A quoi servent les hook useReducer, useEffect, useState

### Qu'est ce que le onClick() et le onChange() ?

### Qu'est ce que les React Class Components ?

### Comment remplir des données ?

( localhost/api/seed )
