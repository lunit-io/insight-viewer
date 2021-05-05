import React, { useEffect } from 'react'
import { Subscription } from 'rxjs'
import { useToast } from '@chakra-ui/react'
import { errorMessage } from '../../utils/messageService'

let subscription: Subscription

export default function ErrorMessage(): JSX.Element {
  const toast = useToast()
  const id = 'http-error-toast'

  useEffect(() => {
    subscription = errorMessage.getMessage().subscribe(message => {
      if (toast.isActive(id)) return

      toast({
        id,
        title: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [toast])

  return <div />
}
