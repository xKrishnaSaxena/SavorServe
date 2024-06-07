import React from "react";
import { Restaurant } from "../../types/Restaurant";

interface OverviewProps {
  restaurant: Restaurant;
}

const Overview: React.FC<OverviewProps> = ({ restaurant }) => {
  return (
    <div className="text-left text-white">
      <p className="mt-6 text-lg leading-8">
        <strong>Cuisines: </strong>
        {restaurant.cuisine.join(", ")}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Location: </strong>
        {restaurant.location}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Status: </strong>
        {restaurant.status}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Timings: </strong>
        {restaurant.timing}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Safety Measures: </strong>
        {restaurant.safetyMeasures.join(", ")}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Known For: </strong>
        {restaurant.knownFor.join(", ")}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Average Cost: </strong>
        {restaurant.averageCost}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Payment Methods: </strong>
        {restaurant.paymentMethods.join(", ")}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>More Info: </strong>
        {restaurant.moreInfo.join(", ")}
      </p>
    </div>
  );
};

export default Overview;
