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
      <IonHeader>
        <IonToolbar className='ion-padding-start' color="primary">
          <IonTitle>Contact {contactData.type === 'seller' ? 'Seller' : 'Buyer'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <Link to="/marketplace" className="inline-flex items-center text-[#f8982a] mb-4">
            <ChevronLeftIcon size={20} className="mr-1" />
            Back to Marketplace
          </Link>
          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeLg="8">
                <IonCard className="mb-6">
                  <IonCardHeader>
                    <IonCardTitle>
                      Contact {contactData.type === 'seller' ? 'Seller' : 'Buyer'}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {isSubmitted ? (
                      <div className="flex flex-col items-center py-8">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <CheckCircleIcon size={40} className="text-green-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                          Message Sent Successfully!
                        </h2>
                        <p className="text-gray-600 mb-6 text-center">
                          Your message has been sent to {contactData.name}. They will
                          get back to you soon.
                        </p>
                        <div className="flex gap-4">
                          <Link to="/marketplace">
                            <IonButton color="medium" fill="outline">
                              Back to Marketplace
                            </IonButton>
                          </Link>
                          <IonButton
                            color="secondary"
                            onClick={() => setIsSubmitted(false)}
                          >
                            Send Another Message
                          </IonButton>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        {listing && (
                          <IonCard className="mb-4 bg-gray-50">
                            <IonCardContent className="flex items-center">
                              <IonAvatar slot="start" className="mr-3">
                                <img src={listing.image} alt={listing.title} />
                              </IonAvatar>
                              <div>
                                <p className="font-medium">{listing.title}</p>
                                <p className="text-gray-600">{listing.price}</p>
                              </div>
                            </IonCardContent>
                          </IonCard>
                        )}
                        <IonItem className="mb-2" lines="none">
                          <IonLabel position="stacked">Your Name</IonLabel>
                          <IonInput
                            name="name"
                            value={formData.name}
                            onIonChange={e => handleChange(e as any)}
                            placeholder="Enter your full name"
                            className={errors.name ? 'ion-invalid ion-touched' : ''}
                          />
                        </IonItem>
                        {errors.name && (
                          <div className="text-red-500 text-xs mb-2 ml-2">{errors.name}</div>
                        )}
                        <IonItem className="mb-2" lines="none">
                          <IonLabel position="stacked">Email Address</IonLabel>
                          <IonInput
                            name="email"
                            type="email"
                            value={formData.email}
                            onIonChange={e => handleChange(e as any)}
                            placeholder="Enter your email address"
                            className={errors.email ? 'ion-invalid ion-touched' : ''}
                          />
                        </IonItem>
                        {errors.email && (
                          <div className="text-red-500 text-xs mb-2 ml-2">{errors.email}</div>
                        )}
                        <IonItem className="mb-2" lines="none">
                          <IonLabel position="stacked">Phone Number</IonLabel>
                          <IonInput
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onIonChange={e => handleChange(e as any)}
                            placeholder="Enter your phone number"
                            className={errors.phone ? 'ion-invalid ion-touched' : ''}
                          />
                        </IonItem>
                        {errors.phone && (
                          <div className="text-red-500 text-xs mb-2 ml-2">{errors.phone}</div>
                        )}
                        <IonItem className="mb-2" lines="none">
                          <IonLabel position="stacked">Your Message</IonLabel>
                          <IonTextarea
                            name="message"
                            value={formData.message}
                            onIonChange={e => handleChange(e as any)}
                            placeholder={`Write your message to ${contactData.name}...`}
                            rows={6}
                            className={errors.message ? 'ion-invalid ion-touched' : ''}
                          />
                        </IonItem>
                        {errors.message && (
                          <div className="text-red-500 text-xs mb-2 ml-2">{errors.message}</div>
                        )}
                        <div className="flex justify-end mt-4">
                          <IonButton type="submit" color="primary">
                            Send Message
                            <SendIcon size={18} className="ml-2" />
                          </IonButton>
                        </div>
                      </form>
                    )}
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="12" sizeLg="4">
                <IonCard>
                  <IonCardContent>
                    <div className="flex items-center mb-4">
                      <IonAvatar className="mr-3">
                        <img src={contactData.image} alt={contactData.name} />
                      </IonAvatar>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {contactData.name}
                        </h2>
                        <p className="text-[#f8982a] capitalize">
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
