import { useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Share2, Plus, Award } from 'lucide-react'
import MobileLayout from '../components/MobileLayout'
import PetLifeLogo from '../components/PetLifeLogo'

const posts = [
  {
    id: 1,
    user: 'María García',
    pet: 'Max',
    avatar: '👩',
    petEmoji: '🐕',
    time: 'hace 2h',
    content: 'Max acaba de completar su curso de obediencia básica en K9 Training. ¡Tan orgullosa de él! 🎉',
    likes: 34,
    comments: 8,
    tag: 'Logro',
    tagColor: '#D4A757',
  },
  {
    id: 2,
    user: 'Carlos Ruiz',
    pet: 'Luna',
    avatar: '👨',
    petEmoji: '🐈',
    time: 'hace 4h',
    content: 'Recomiendo totalmente la Clínica Norte Valencia. El Dr. Martínez es increíble con los gatos. Luna ya está mucho mejor ❤️',
    likes: 52,
    comments: 15,
    tag: 'Recomendación',
    tagColor: '#21878F',
  },
  {
    id: 3,
    user: 'Ana López',
    pet: 'Rocky',
    avatar: '👩‍🦱',
    petEmoji: '🐕',
    time: 'hace 6h',
    content: '¿Alguno conoce buenos parques pet-friendly cerca del Turia? Rocky necesita correr más 🏃',
    likes: 18,
    comments: 23,
    tag: 'Pregunta',
    tagColor: '#F3705C',
  },
]

const leaderboard = [
  { rank: 1, name: 'María G.', points: 1240, emoji: '👩', badge: '🥇' },
  { rank: 2, name: 'Carlos R.', points: 980,  emoji: '👨', badge: '🥈' },
  { rank: 3, name: 'Ana L.',    points: 740,  emoji: '👩‍🦱', badge: '🥉' },
]

export default function Comunidad() {
  const navigate = useNavigate()

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 sticky top-0 z-40 border-b border-petlife-border">
        <div className="flex items-center justify-between">
          <h1 className="text-petlife-dark font-bold text-xl">Comunidad</h1>
          <button className="p-2 rounded-xl bg-petlife-primary tap-active">
            <Plus size={20} color="white" />
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="px-5 pt-4 mb-4">
        <div className="bg-white rounded-2xl shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} color="#D4A757" />
            <h3 className="text-petlife-dark font-bold text-sm">Top embajadores PetLife</h3>
          </div>
          <div className="space-y-2">
            {leaderboard.map(item => (
              <div key={item.rank} className="flex items-center gap-3">
                <span className="text-lg w-6 text-center">{item.badge}</span>
                <div className="w-8 h-8 rounded-full bg-petlife-primary-light flex items-center justify-center text-xl">{item.emoji}</div>
                <span className="flex-1 text-sm font-semibold text-petlife-dark">{item.name}</span>
                <span className="text-petlife-ochre font-bold text-sm">{item.points} pts</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 py-2 rounded-xl text-petlife-primary text-xs font-bold border border-petlife-primary tap-active">
            Ver ranking completo
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="px-5 space-y-4 pb-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-2xl shadow-card p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-petlife-primary-light flex items-center justify-center text-xl flex-shrink-0">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-petlife-dark font-bold text-sm">{post.user}</span>
                  <span className="text-petlife-mid text-xs">& {post.petEmoji} {post.pet}</span>
                  <span className="ml-auto text-petlife-mid text-xs">{post.time}</span>
                </div>
                <span
                  className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                  style={{ background: post.tagColor }}
                >
                  {post.tag}
                </span>
              </div>
            </div>

            <p className="text-petlife-dark text-sm mt-3 leading-relaxed">{post.content}</p>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-petlife-border">
              <button className="flex items-center gap-1.5 tap-active">
                <Heart size={16} color="#F3705C" />
                <span className="text-petlife-mid text-xs font-semibold">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 tap-active">
                <MessageCircle size={16} color="#94A3B8" />
                <span className="text-petlife-mid text-xs font-semibold">{post.comments}</span>
              </button>
              <button className="ml-auto tap-active">
                <Share2 size={16} color="#94A3B8" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Promo to refer */}
      <div className="mx-5 mb-6 rounded-2xl p-4 shadow-card" style={{ background: 'linear-gradient(135deg, #21878F 0%, #1A6E75 100%)' }}>
        <p className="text-white font-bold text-sm mb-1">¡Recomienda PetLife!</p>
        <p className="text-white/70 text-xs mb-3">Gana 500 puntos por cada amigo que se una</p>
        <button className="bg-white px-4 py-2 rounded-xl text-petlife-primary font-bold text-sm tap-active">
          Invitar amigos
        </button>
      </div>
    </MobileLayout>
  )
}
