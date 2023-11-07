import React, { Suspense } from 'react'
import NavBar from '../../components/Navigation/NavBar'
import {

  ScaleIcon,CheckCircleIcon,ArrowTrendingUpIcon,ArrowTrendingDownIcon

} from '@heroicons/react/24/outline'
import CreateFormButton from '../../components/MainPage/CreateFormBtn'

const cards = [
  { name: 'Total visits', href: '#', icon: ScaleIcon, amount: '0' },
  { name: 'Total Submission', href: '#', icon: CheckCircleIcon, amount: '0' },
  { name: 'Submission rate', href: '#', icon: ArrowTrendingUpIcon, amount: '0' },
  { name: 'Bounce rate', href: '#', icon: ArrowTrendingDownIcon, amount: '0' },
  // More items...
]

export default function MainPage() {
  return (
    <div className=' w-full'>
       <NavBar/> 
  
       <div className="w-full min-h-screen pt-8 bg-background">
              <div className="mx-auto max-w-6xl px-4 sm:px-6  lg:px-8">
                <h2 className="text-lg font-medium leading-6 text-gray-900">Overview</h2>
                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Card */}
                  {cards.map((card) => (
                    <div key={card.name} className="overflow-hidden rounded-lg bg-white shadow">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="truncate text-sm font-medium text-gray-500">{card.name}</dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">{card.amount}</div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <a href={card.href} className="font-medium text-cyan-700 hover:text-cyan-900">
                            View all
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mx-auto max-w-6xl px-4 sm:px-6  lg:px-8">
                <p className=' text-2xl font-semibold py-6'>Your Form</p>

                <div>
                  <CreateFormButton/>
                  <Suspense>
                    
                  </Suspense>

                </div>
                
              </div>
              </div>
    </div>
  )
}