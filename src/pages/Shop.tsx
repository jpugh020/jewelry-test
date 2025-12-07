import { useState, useMemo } from 'react'
import { Search, Filter, ShoppingCart } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useCart } from '@/store/store'

const jewelryData = [
  {
    id: 1,
    name: 'Mystical Amethyst Crown',
    price: 249.99,
    category: 'Crowns',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    description: 'An enchanted crown adorned with glowing amethyst crystals',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2,
    name: 'Moonstone Pendant',
    price: 189.99,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    description: 'Ethereal moonstone suspended in silver chains',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 3,
    name: 'Dragon Emerald Ring',
    price: 329.99,
    category: 'Rings',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    description: 'A powerful ring with a dragon-shaped emerald setting',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 4,
    name: 'Celestial Sapphire Bracelet',
    price: 279.99,
    category: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop',
    description: 'Celestial sapphires arranged in a cosmic pattern',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 5,
    name: 'Phoenix Gold Necklace',
    price: 399.99,
    category: 'Necklaces',
    image: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi.etsystatic.com%2F45936208%2Fr%2Fil%2Fa8c5fd%2F6102533115%2Fil_1080xN.6102533115_k62o.jpg&sp=1765083135T15579a28ed083382036869a9538261418b80e820110c2d93dabc1f0ee37971c6',
    description: 'A majestic phoenix crafted in pure gold',
    rating: 5.0,
    inStock: true,
  },
  {
    id: 6,
    name: 'Obsidian Shadow Earrings',
    price: 149.99,
    category: 'Earrings',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    description: 'Dark obsidian stones set in mystical shadow silver',
    rating: 4.5,
    inStock: true,
  },
  {
    id: 7,
    name: 'Crystal Harmony Ring',
    price: 219.99,
    category: 'Rings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    description: 'Harmonious crystal formations in perfect balance',
    rating: 4.8,
    inStock: false,
  },
  {
    id: 8,
    name: 'Starlight Crown',
    price: 289.99,
    category: 'Crowns',
    image: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fcoronadas.com%2Fcdn%2Fshop%2Ffiles%2FIMG_1096.jpg%3Fv%3D1696386588&sp=1765081793T2646f73ecb0b4c1d997861d5803b49e50dfb1f88a547e54eb718b25a66f8ea3d',
    description: 'A crown adorned with stars and celestial light',
    rating: 4.9,
    inStock: true,
  },
]

const categories = ['All', 'Crowns', 'Necklaces', 'Rings', 'Bracelets', 'Earrings']
const priceRanges = [
  { label: 'Under $150', min: 0, max: 150 },
  { label: '$150 - $250', min: 150, max: 250 },
  { label: '$250 - $350', min: 250, max: 350 },
  { label: 'Over $350', min: 350, max: Infinity },
]

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ label: string; min: number; max: number } | null>(null)
  const [showOutOfStock, setShowOutOfStock] = useState(false)
  const addToCart = useCart((state) => state.addToCart)

  const filteredJewelry = useMemo(() => {
    let result = jewelryData

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((item) => item.category === selectedCategory)
    }

    // Price filter
    if (selectedPriceRange) {
      result = result.filter(
        (item) =>
          item.price >= selectedPriceRange.min && item.price <= selectedPriceRange.max
      )
    }

    // Stock filter
    if (!showOutOfStock) {
      result = result.filter((item) => item.inStock)
    }

    return result
  }, [searchQuery, selectedCategory, selectedPriceRange, showOutOfStock])

  return (
    <div className="min-h-screen bg-linear-to-b from-[#324c39] to-[#1a2e24] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-[#ebc9aa] mb-8">Jewelry Shop</h1>

        {/* Search and Filter Bar */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#324c39]" />
            <Input
              type="text"
              placeholder="Search jewelry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#f5f5f5] text-[#324c39] border-[#ebc9aa]"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Category Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#ebc9aa] hover:bg-[#d4a574] text-[#324c39] flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Category
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={selectedCategory === cat ? 'bg-[#ebc9aa]' : ''}
                  >
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Price Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#ebc9aa] hover:bg-[#d4a574] text-[#324c39] flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Price
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Price</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedPriceRange(null)}>
                  All Prices
                </DropdownMenuItem>
                {priceRanges.map((range) => (
                  <DropdownMenuItem
                    key={range.label}
                    onClick={() => setSelectedPriceRange(range)}
                  >
                    {range.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Stock Filter */}
            <Button
              onClick={() => setShowOutOfStock(!showOutOfStock)}
              className={`${
                showOutOfStock
                  ? 'bg-[#ebc9aa] text-[#324c39]'
                  : 'bg-[#324c39] text-[#f5f5f5] border border-[#ebc9aa]'
              } hover:bg-[#d4a574]`}
            >
              {showOutOfStock ? 'Show All' : 'Hide Out of Stock'}
            </Button>

            {/* Clear Filters */}
            {(searchQuery || selectedCategory !== 'All' || selectedPriceRange || showOutOfStock) && (
              <Button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                  setSelectedPriceRange(null)
                  setShowOutOfStock(false)
                }}
                className="bg-[#324c39] text-[#f5f5f5] border border-[#ebc9aa] hover:bg-[#1a2e24]"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Results count */}
          <p className="text-[#f5f5f5]">
            Showing {filteredJewelry.length} of {jewelryData.length} items
          </p>
        </div>

        {/* Jewelry Grid */}
        {filteredJewelry.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredJewelry.map((item) => (
              <div
                key={item.id}
                className="bg-[#2a3d33] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-[#1a2e24]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-[#ebc9aa] font-bold text-lg">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#ebc9aa] mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-[#f5f5f5] text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(item.rating) ? '★' : '☆'}>
                          {' '}
                        </span>
                      ))}
                    </div>
                    <span className="text-[#f5f5f5] text-sm">({item.rating})</span>
                  </div>

                  {/* Price and Button */}
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#ebc9aa]">
                      ${item.price.toFixed(2)}
                    </span>
                    <Button
                      className="bg-[#ebc9aa] hover:bg-[#d4a574] text-[#324c39] disabled:opacity-50 flex items-center gap-2"
                      disabled={!item.inStock}
                      onClick={() => {
                        if (item.inStock) {
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          })
                        }
                      }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {item.inStock ? 'Add' : 'N/A'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#f5f5f5] text-xl">No jewelry found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
