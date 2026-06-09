import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { chefsData } from '../../../constants/mockData';

export default function ChefSection() {
  const displayChefs = chefsData.slice(0, 3);

  return (
    <section id="chefs" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 md:mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-3 md:mb-4 text-primary-900">Elite Culinary Masters</h2>
          <p className="text-gray-500 text-sm md:text-base">Discover top-tier chefs ready to create magic in your kitchen.</p>
        </div>
        <Link to="/browse-chefs" className="hidden sm:inline-block shrink-0">
          <Button variant="outline" className="rounded-full">View all Chefs</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayChefs.map((chef) => (
          <Card key={chef.id} className="group cursor-pointer border-transparent shadow-none hover:shadow-xl transition-all duration-300">
            <Link to={`/chef/${chef.id}`} className="block relative h-80 overflow-hidden rounded-t-2xl">
              <img 
                src={chef.image} 
                alt={chef.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                ⭐ {chef.rating} ({chef.reviews})
              </div>
            </Link>
            <CardContent className="pt-6">
              <h3 className="text-xl font-serif font-medium mb-1">{chef.name}</h3>
              <p className="text-accent text-sm font-semibold mb-4 uppercase tracking-wider">{chef.specialty}</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {chef.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center sm:hidden">
        <Link to="/browse-chefs" className="block w-full">
          <Button variant="outline" className="rounded-full w-full">View all Chefs</Button>
        </Link>
      </div>
    </section>
  );
}
