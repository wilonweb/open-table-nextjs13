Résumé du chapitre "data in server components."

## Relier des table en SQL

Pour relier deux tables dans une base de données, on utilise une clé primaire et une clé étrangère (qui est la clé primaire d'une autre table).

- Une clé primaire est un identifiant unique pour chaque enregistrement dans une table
- une clé étrangère est une référence à la clé primaire d'une autre table.

## Connection Postgress avec Prisma ( supabase )

On utilise Supabase pour générer un mot de passe a coller dans le code pour se connecter a postgres

On utilise l'ORM Prisma pour éviter d'écrire les requette SQL. pour ce faire :

- On commence par s'inscrire sur supabase
- Puis on créer un projet OpenTables
- On copie le password de notre projet et on l'écris en commentaire dans le code.
- On install prima : npm
  install prisma@4.8.1
- on initialise prima : npx prisma init
- On vas sur le site de Prisma>ProjectSetting>Databse et on copie le connection string pour le coller dans le fichier .env
- On modifier le [PASSWORD] avec celui qu'on a coller dans notre projet précédement

Maintenant on a connecter notre application a notre BDD

## Le shema SQL

On définis notre shemaSQL dans schema.prisma

Une fois qu'on a notreschema.prisma on le push avec `npx prisma db push` vers supabase.

Ensuite on récupere les donner grace au fichier seeds.ts en l'ouvrant dans le navigateur.

## Les data de la BDD vers NextJS

Avec NextJS la récupération de donné se fait depuis un ORM pour être transmise a un server Components qui les envoie au client.

## Comment récupérer les données.

On commence a les stocker dans une variable avec l'objet PrismeCleint

```javascript
/*Ajout de l'import Prisma*/
import { PrismaClient } from "@prisma/client";

/* déclaration de l'instance prisma */
const prisma = new PrismaClient();
```

Ensuite on utlilise findMany pour récupérer tout les enregistrement de la table.

```javascript
const fetchRestaurants = async () => {
  const restaurants = await prisma.restaurant.findMany();
  return restaurants;
};
```

```javascript
export default async function Home() {
  /*appelle de la fonction fetchRestaurant qui attend les resultat dans la variable restaurant qu'on affiche avec un console.log
  On pourras ensuite apeller les data dans notre composant Restaurant
  */
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

## Itérer les carte de chaque resteaurant

Grace a la variable contenant le restaurant on peut les itérer pour retourner chaque carte qui presenties les different restaurant.

On vas définir les props a selectionner avec une promise...await
