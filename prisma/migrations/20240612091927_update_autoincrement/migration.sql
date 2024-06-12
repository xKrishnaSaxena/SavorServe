-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "diningRatings" INTEGER NOT NULL,
    "deliveryRating" INTEGER NOT NULL,
    "deliveryReviews" TEXT NOT NULL,
    "cuisines" TEXT[],
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timing" TEXT NOT NULL,
    "safetyMeasures" TEXT[],
    "knownFor" TEXT[],
    "averageCost" TEXT NOT NULL,
    "paymentMethods" TEXT[],
    "moreInfo" TEXT[],
    "images" TEXT[],
    "menuPhotos" TEXT[],

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "dishes" TEXT[],
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "userReviews" INTEGER NOT NULL,
    "userFollowers" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "content" TEXT,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
