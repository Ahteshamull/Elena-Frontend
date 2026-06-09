import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { chefsData } from '../../constants/mockData';

export default function AllChefs() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-serif mb-4 text-primary-900">All Culinary Masters</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Browse our complete roster of elite private chefs and find the perfect match for your next extraordinary event.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chefsData.map((chef) => (
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
    </div>
  );
}
