import React, { useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import {
  ChevronLeftIcon,
  UserIcon,
  PhoneIcon,
  MailIcon,
  MessageSquareIcon,
  SendIcon,
  CheckCircleIcon,
  User,
} from 'lucide-react'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonTextarea,
  IonItem,
  IonLabel,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from '@ionic/react'

const ContactSeller: React.FC = () => {
  const { sellerId } = useParams<{ sellerId: string }>()
  const location = useLocation()
  const listing = (location.state as any)?.listing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Mock data for seller/buyer
  const contactData = {
    id: sellerId,
    name:
      sellerId === 'ibrahim-farms'
        ? 'Ibrahim Farms'
        : sellerId === 'green-valley'
        ? 'Green Valley Farms'
        : sellerId === 'agri-supplies'
        ? 'AgriSupplies Ltd'
        : sellerId === 'modern-agric'
        ? 'Modern Agric Services'
        : sellerId === 'northern-processors'
        ? 'Northern Processors Ltd'
        : 'Fresh Foods Market',
    type:
      sellerId === 'northern-processors' || sellerId === 'fresh-foods'
        ? 'buyer'
        : 'seller',
    image:
      listing?.image ||
      'https://images.unsplash.com/photo-1560015534-cee980ba7e13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    responseRate: '95%',
    responseTime: 'Within 24 hours',
    location: listing?.location || 'Kano State',
    memberSince: 'January 2021',
    description: `We are a ${
      sellerId === 'ibrahim-farms'
        ? 'tomato farm'
        : sellerId === 'green-valley'
        ? 'pepper producer'
        : sellerId === 'agri-supplies'
        ? 'leading agricultural input supplier'
        : sellerId === 'modern-agric'
        ? 'provider of agricultural services'
        : sellerId === 'northern-processors'
        ? 'food processing company'
        : 'fresh produce market'
    } 
      based in ${listing?.location || 'Kano'}, Nigeria. We ${
      sellerId === 'northern-processors' || sellerId === 'fresh-foods'
        ? 'source'
        : 'supply'
    } 
      high-quality ${
        listing?.category === 'Produce'
          ? 'agricultural produce'
          : listing?.category === 'Inputs'
          ? 'farming inputs'
          : 'agricultural services'
      } 
      to support the local farming community.`,
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      // In a real app, this would send the message to the server
      setIsSubmitted(true)
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding bg-gray-100">
        <IonTitle color={'primary'}>Contact {contactData.type === 'seller' ? 'Seller' : 'Buyer'}</IonTitle>
        <div className="max-w-5xl mx-auto">
          <Link to="/marketplace" className="inline-flex items-center text-[#f8982a] mb-4">
            <ChevronLeftIcon size={20} className="mr-1" />
            Back to Marketplace
          </Link>
          <IonGrid>
            <IonRow>
              <IonCol size="12" >
                <IonCard>
                  <IonCardContent>
                    <div className="flex items-center mb-4">
                      <IonAvatar className="mr-3">
                        <User size={48} className="text-amber-600" />
                      </IonAvatar>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {contactData.name}
                        </h2>
                        <p className="text-[#2da309] capitalize">
                          {contactData.type}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 border-t border-b py-4">
                      <p className="text-gray-700 mb-4">{contactData.description}</p>
                      <div className="flex flex-wrap gap-y-3">
                        <div className="w-1/2 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-[#f8982a] mr-2"></div>
                          <span className="text-sm text-gray-600">
                            {contactData.location}
                          </span>
                        </div>
                        <div className="w-1/2 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-[#f8982a] mr-2"></div>
                          <span className="text-sm text-gray-600">
                            Member since {contactData.memberSince}
                          </span>
                        </div>
                        <div className="w-1/2 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-[#f8982a] mr-2"></div>
                          <span className="text-sm text-gray-600">
                            Rating: {contactData.rating}/5
                          </span>
                        </div>
                        <div className="w-1/2 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-[#f8982a] mr-2"></div>
                          <span className="text-sm text-gray-600">
                            Response rate: {contactData.responseRate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-3">Response Time</h3>
                      <div className="bg-green-100 text-green-800 p-3 rounded-md flex items-center">
                        <CheckCircleIcon size={20} className="mr-2" />
                        <span>{contactData.responseTime}</span>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ContactSeller
