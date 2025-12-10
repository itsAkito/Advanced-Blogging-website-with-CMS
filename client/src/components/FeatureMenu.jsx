import React, { useState } from 'react'
import { X, FileText, Image as ImageIcon, Zap, Download } from 'lucide-react'
import toast from 'react-hot-toast'

const FeatureMenu = ({ blogTitle, blogContent }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Features List
  const features = [
    {
      id: 'resume',
      name: 'Resume Builder',
      icon: FileText,
      description: 'Create a professional resume',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'summarize',
      name: 'Text Summarization',
      icon: Zap,
      description: 'Summarize blog content instantly',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'imageGen',
      name: 'Image Generation',
      icon: ImageIcon,
      description: 'Generate AI images for content',
      color: 'from-orange-600 to-red-600'
    }
  ]

  // Summarize Blog Content
  const handleSummarize = () => {
    if (!blogContent) {
      toast.error('No blog content to summarize')
      return
    }

    setIsGenerating(true)
    
    // Simulate API call - replace with actual API
    setTimeout(() => {
      const plainText = blogContent.replace(/<[^>]+>/g, '')
      const sentences = plainText.split(/[.!?]+/).filter(s => s.trim())
      const summary = sentences.slice(0, Math.ceil(sentences.length / 3)).join('. ') + '.'
      
      toast.success('Summary generated!')
      setIsGenerating(false)
      
      // Show summary in alert or modal
      alert(`Summary of "${blogTitle}":\n\n${summary}`)
    }, 1500)
  }

  // Resume Builder
  const handleResumeBuilder = () => {
    toast.loading('Opening Resume Builder...')
    
    setTimeout(() => {
      // Redirect to resume builder page or open modal
      window.open('/admin/resume-builder', '_blank', 'width=1200,height=800')
      toast.dismiss()
    }, 1000)
  }

  // Image Generation
  const handleImageGen = () => {
    if (!blogTitle) {
      toast.error('Please provide a blog title for image generation')
      return
    }

    setIsGenerating(true)
    toast.loading('Generating image based on blog title...')
    
    setTimeout(() => {
      toast.dismiss()
      toast.success('Image generation feature coming soon!')
      // In real app: window.open(`/admin/image-gen?prompt=${blogTitle}`)
      setIsGenerating(false)
    }, 2000)
  }

  // Feature Button Handler
  const handleFeature = (featureId) => {
    switch(featureId) {
      case 'summarize':
        handleSummarize()
        break
      case 'resume':
        handleResumeBuilder()
        break
      case 'imageGen':
        handleImageGen()
        break
      default:
        toast.error('Feature not available')
    }
    setActiveFeature(featureId)
  }

  return (
    <>
      {/* Feature Menu Button (Floating) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='fixed bottom-8 right-8 w-14 h-14 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 z-40'
          title='Open AI Features Menu'
        >
          <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
            <path d='M10.5 1.5H3a1.5 1.5 0 0 0-1.5 1.5v10A1.5 1.5 0 0 0 3 14.5h14a1.5 1.5 0 0 0 1.5-1.5V8m-5-5h5m-5 0v5m0-5L10.5 1.5' stroke='currentColor' strokeWidth='1.5' fill='none'/>
          </svg>
        </button>
      )}

      {/* Feature Menu Modal */}
      {isOpen && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in'>
          <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300'>
            
            {/* Header */}
            <div className='sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>AI Features</h2>
                <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Enhance your content with AI tools</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors'
              >
                <X className='w-6 h-6 text-gray-600 dark:text-gray-400' />
              </button>
            </div>

            {/* Content */}
            <div className='p-6'>
              {/* Features Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                {features.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <button
                      key={feature.id}
                      onClick={() => handleFeature(feature.id)}
                      disabled={isGenerating && activeFeature === feature.id}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 group hover:scale-105 disabled:opacity-50
                        ${activeFeature === feature.id && isGenerating
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 bg-white dark:bg-gray-800'
                        }
                      `}
                    >
                      <div className={`inline-block p-3 rounded-lg bg-linear-to-r ${feature.color} mb-4`}>
                        <Icon className='w-6 h-6 text-white' />
                      </div>
                      <h3 className='font-bold text-gray-900 dark:text-white text-left mb-1'>
                        {feature.name}
                      </h3>
                      <p className='text-sm text-gray-600 dark:text-gray-400 text-left'>
                        {feature.description}
                      </p>
                      {isGenerating && activeFeature === feature.id && (
                        <div className='mt-3 flex items-center gap-2 text-sm text-green-600'>
                          <div className='w-2 h-2 bg-green-600 rounded-full animate-pulse'></div>
                          Processing...
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Quick Stats */}
              <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center'>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  <span className='font-semibold text-gray-900 dark:text-white'>💡 Tip:</span> Use these tools to enhance your blog content and create additional resources!
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className='border-t border-gray-200 dark:border-gray-800 p-6 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50'>
              <button
                onClick={() => setIsOpen(false)}
                className='px-6 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
              >
                Close
              </button>
              <button
                onClick={() => {
                  toast.success('More features coming soon!')
                  setIsOpen(false)
                }}
                className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all'
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FeatureMenu
