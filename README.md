# Projet Next JS Table

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

#### Link components

sur notre menu/page.tsx on importe Link component
puis on change les <a> en <Link> et on définis le path du composant qu'on veut afficher

Ensuite on définis le userRouter Hook

#### userRouter hook

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

## Question

### Qu'est ce qu'un components ?
