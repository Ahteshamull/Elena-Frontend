import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { useGetAllUsersQuery } from "../../../redux/api/userApi";

export default function ChefSection() {
  const { data, isLoading } = useGetAllUsersQuery({ role: "chef", limit: 3 });
  const displayChefs = data?.data || [];

  return (
    <section
      id="chefs"
      className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 md:mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-3 md:mb-4 text-primary-900">
            Elite Culinary Masters
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Discover top-tier chefs ready to create magic in your kitchen.
          </p>
        </div>
        <Link to="/browse-chefs" className="hidden sm:inline-block shrink-0">
          <Button variant="outline" className="rounded-full">
            View all Chefs
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? // Skeleton Loaders
            Array.from({ length: 3 }).map((_, idx) => (
              <Card
                key={idx}
                className="group border-transparent shadow-none animate-pulse"
              >
                <div className="block relative h-80 overflow-hidden rounded-t-2xl bg-gray-200" />
                <CardContent className="pt-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-5"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          : // Actual Data
            displayChefs.map((user, index) => {
              const profile = user.profile || {};
              const id = user._id;
              const name = profile.fullName || user.userName;
              
              const rawImage = profile.image || user.image;
              const image = rawImage 
                ? (rawImage.startsWith('http') ? rawImage : `http://localhost:8005${rawImage}`) 
                : '/b_1.png';
                
              const rating = profile.rating || "5.0";
              const reviews = profile.reviewCount || "0";
              const specialty =
                profile.cuisineSpecialties?.[0] ||
                profile.chefCategory?.[0] ||
                "Executive Chef";
              const description =
                profile.aboutMe ||
                profile.shortDescription ||
                "An exquisite culinary artist.";

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Card className="group cursor-pointer border-transparent shadow-none hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                    <Link
                      to={`/chef/${id}`}
                      className="block relative h-80 overflow-hidden rounded-t-2xl"
                    >
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        ⭐ {rating} ({reviews})
                      </div>
                    </Link>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-serif font-medium mb-1">
                        {name}
                      </h3>
                      <p className="text-accent text-sm font-semibold mb-4 uppercase tracking-wider">
                        {specialty}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
      </div>
      <div className="mt-8 text-center sm:hidden">
        <Link to="/browse-chefs" className="block w-full">
          <Button variant="outline" className="rounded-full w-full">
            View all Chefs
          </Button>
        </Link>
      </div>
    </section>
  );
}
