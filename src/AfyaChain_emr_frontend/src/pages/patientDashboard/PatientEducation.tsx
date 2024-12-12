// src/pages/patientDashboard/PatientEducation.tsx
import { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Play, 
  FileText, 
  Star, 
  BookMarked,
  Heart,
  Activity,
  Filter,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Card } from '../../components/ui/card';

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'guide' | 'faq';
  category: string;
  thumbnail?: string;
  duration?: string;
  author: string;
  rating: number;
  saved: boolean;
  description: string;
}

export function PatientEducation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'heart', name: 'Heart Health', icon: Heart },
    { id: 'diabetes', name: 'Diabetes', icon: Activity },
    { id: 'nutrition', name: 'Nutrition', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Health Education</h1>
        
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <BookMarked className="h-4 w-4 mr-1" /> Saved Resources
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="heart">Heart Health</option>
              <option value="diabetes">Diabetes</option>
              <option value="nutrition">Nutrition</option>
              <option value="exercise">Exercise</option>
              <option value="mental">Mental Health</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Featured Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredResources.map((resource) => (
          <FeaturedResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {/* Resource Categories */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </Card>

      {/* Recent Resources */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Resources</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <div className="space-y-4">
          {recentResources.map((resource) => (
            <ResourceListItem key={resource.id} resource={resource} />
          ))}
        </div>
      </Card>

      {/* Recommended for You */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function FeaturedResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="relative overflow-hidden group">
      <div className="aspect-video bg-gray-100 relative">
        {resource.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-12 w-12 text-white opacity-75 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        <img
          src={resource.thumbnail || '/placeholder.jpg'}
          alt={resource.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs font-medium text-blue-600">{resource.category}</span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">{resource.duration}</span>
        </div>
        <h3 className="font-medium text-gray-900 mb-1">{resource.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{resource.author}</p>
        <div className="flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < resource.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function CategoryCard({ id, name, icon: Icon }: {
  id: string;
  name: string;
  icon: any;
}) {
  return (
    <button className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
      <div className="flex items-center space-x-3">
        <Icon className="h-6 w-6 text-blue-600" />
        <span className="font-medium text-gray-900">{name}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </button>
  );
}

function ResourceListItem({ resource }: { resource: Resource }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        {resource.type === 'video' ? (
          <Play className="h-8 w-8 text-blue-600" />
        ) : (
          <FileText className="h-8 w-8 text-blue-600" />
        )}
        <div>
          <h3 className="font-medium text-gray-900">{resource.title}</h3>
          <p className="text-sm text-gray-500">{resource.author}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">{resource.duration}</span>
          </div>
        </div>
        <button className="text-blue-600 hover:text-blue-700">
          <BookMarked className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        {resource.type === 'video' ? (
          <Play className="h-8 w-8 text-blue-600 flex-shrink-0" />
        ) : (
          <FileText className="h-8 w-8 text-blue-600 flex-shrink-0" />
        )}
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{resource.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{resource.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{resource.duration}</span>
            <button className="text-blue-600 hover:text-blue-700">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Sample data
const featuredResources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Blood Pressure',
    type: 'video',
    category: 'Heart Health',
    thumbnail: '/heart-health.jpg',
    duration: '15 min',
    author: 'Dr. Sarah Smith',
    rating: 4.5,
    saved: false,
    description: 'Learn about blood pressure and how to maintain healthy levels.'
  },
  // Add more featured resources...
];

const recentResources: Resource[] = [
  {
    id: '2',
    title: 'Diabetes Management Guide',
    type: 'guide',
    category: 'Diabetes',
    duration: '10 min read',
    author: 'Dr. Michael Chang',
    rating: 4.0,
    saved: true,
    description: 'Comprehensive guide to managing diabetes effectively.'
  },
  // Add more recent resources...
];

const recommendedResources: Resource[] = [
  {
    id: '3',
    title: 'Healthy Eating Habits',
    type: 'article',
    category: 'Nutrition',
    duration: '5 min read',
    author: 'Jane Wilson, RD',
    rating: 4.8,
    saved: false,
    description: 'Tips for developing and maintaining healthy eating habits.'
  },
  // Add more recommended resources...
];