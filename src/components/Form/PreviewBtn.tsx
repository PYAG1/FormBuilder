import React from 'react'
import { useBuilderContext } from '../../context/designerContext'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { FormElements } from '../../utils/types'

export default function PreviewBtn() {
  const {elements} = useBuilderContext()
  const [open, setOpen] = useState(false)
  return (
    <>
    <button className=' py-2 px-4 bg-secondary rounded-lg text-primary' onClick={()=>{setOpen(true)}} >
    Preview
</button>
    <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={setOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
           
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left h-max md:min-h-[80vh]   shadow-xl transition-all sm:my-8 lg:w-[50%]  w- sm:p-6">
              
              <div>
             
                <div className="mt-3 sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                 Preview Form
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                     This is how your form will show
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 overflow-y-scroll h-[70vh]">
                {
                  elements.map((item)=>{
                    const FormComponent = FormElements[item.type].formComponent
                    return <FormComponent elementInstance={item}/>
                  })
                }

              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
  </>
  )
}
