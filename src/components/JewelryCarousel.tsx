import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const jewelryImages = [
  {
    id: 1,
    title: 'Mystical Amethyst Crown',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop',
    description: 'An enchanted crown adorned with glowing amethyst crystals'
  },
  {
    id: 2,
    title: 'Moonstone Pendant',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=600&fit=crop',
    description: 'Ethereal moonstone suspended in silver chains'
  },
  {
    id: 3,
    title: 'Dragon Emerald Ring',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop',
    description: 'A powerful ring with a dragon-shaped emerald setting'
  },
  {
    id: 4,
    title: 'Celestial Sapphire Bracelet',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=600&fit=crop',
    description: 'Celestial sapphires arranged in a cosmic pattern'
  },
  {
    id: 5,
    title: 'Phoenix Gold Necklace',
    image: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi.etsystatic.com%2F45936208%2Fr%2Fil%2Fa8c5fd%2F6102533115%2Fil_1080xN.6102533115_k62o.jpg&sp=1765083135T15579a28ed083382036869a9538261418b80e820110c2d93dabc1f0ee37971c6',
    description: 'A majestic phoenix crafted in pure gold'
  }
]

export default function JewelryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoScroll, setAutoScroll] = useState(true)

  useEffect(() => {
    if (!autoScroll) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % jewelryImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoScroll])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % jewelryImages.length)
    setAutoScroll(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + jewelryImages.length) % jewelryImages.length)
    setAutoScroll(false)
  }

  const current = jewelryImages[currentIndex]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-[#324c39] to-[#1a2e24] p-8">
      <div className="flex flex-col lg:flex-row items-center gap-8 max-w-4xl">
        {/* Vertical Navigation */}
        <div className="flex lg:flex-col gap-4 order-2 lg:order-1">
          <Button
            onClick={prevSlide}
            className="bg-[#ebc9aa] hover:bg-[#d4a574] text-[#324c39] p-3"
            size="icon"
          >
            <ChevronUp className="w-6 h-6" />
          </Button>
          
          {/* Thumbnail indicators */}
          <div className="flex lg:flex-col gap-2">
            {jewelryImages.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentIndex(idx)
                  setAutoScroll(false)
                }}
                className={`w-12 h-12 lg:w-16 lg:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-[#ebc9aa] scale-105'
                    : 'border-[#324c39] opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <Button
            onClick={nextSlide}
            className="bg-[#ebc9aa] hover:bg-[#d4a574] text-[#324c39] p-3"
            size="icon"
          >
            <ChevronDown className="w-6 h-6" />
          </Button>
        </div>

        {/* Main carousel display */}
        <div className="flex-1 order-1 lg:order-2">
          <div className="relative">
            <div className="aspect-video lg:aspect-4/5 rounded-xl overflow-hidden shadow-2xl">
              <img
                src={current.image}
                alt={current.title}
                className="w-500px h-600px object-cover"
              />
            </div>
            
            {/* Info overlay */}
            <div className="mt-6 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-[#ebc9aa] mb-2">
                {current.title}
              </h2>
              <p className="text-[#f5f5f5] text-lg">
                {current.description}
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-6">
              {jewelryImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-8 bg-[#ebc9aa]'
                      : 'w-2 bg-[#324c39]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
