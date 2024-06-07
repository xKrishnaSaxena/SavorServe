import { Restaurant } from "@/types/Restaurant";
import Carousel from "../ui/Carousel";

interface MenuProps {
  restaurant: Restaurant;
}

const Menu: React.FC<MenuProps> = ({ restaurant }) => {
  return (
    <>
      <div className="text-center text-white mb-5">
        Photos of Menu by {restaurant.name}
      </div>
      <Carousel images={restaurant.menuPhotos} />
    </>
  );
};
export default Menu;
