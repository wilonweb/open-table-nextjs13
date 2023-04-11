import Description from "./components/description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import Reviews from "./components/Reviews";
import Header from "./components/Header";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Restaurant {
  id: true;
  name: true;
  images: true;
  description: true;
  slug: true;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
    },
  });
  //Au cas ou le slug fournis ne correspond pas a un restaurant
  if (!restaurant) {
    throw new Error();
  }

  return restaurant;
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  console.log(restaurant);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar />
        <Title />
        <Rating />
        <Description />
        <Images />
        <Reviews />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
}
