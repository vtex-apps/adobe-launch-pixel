import { canUseDOM } from 'vtex.render-runtime'

import type { PixelMessage } from './typings/events'
import axios from 'axios'

const requestUserData = async () => {
  const res = await axios.get(
    `${window.location.protocol}//${window.location.hostname}/_v/vtexasia.adobe-launch-pixel/v0/userAdditionalData`,
    {
      withCredentials: true,
    }
  )
  return res.data
}

export async function handleEvents(e: PixelMessage) {
  const encryption = async (email: string | undefined) => {
    if (!email) {
      return
    }
    const details: any = await getServiceId()
    const {serviceId,documentId} = details
    if (details.isError) return null
    const configDetails = await saveConfigDetails(
      'whirlpool',
      'bf3c199c2470cb477d907b1e0917c17b',
      documentId
    )
    if(configDetails.isError) return;
    const encryptedDetails: any = await encryptEmail(serviceId, email)
    if (encryptedDetails.isError) return null
    return encryptedDetails.encryptedUserEmail
  }

  const saveConfigDetails = async (
    serviceName: string,
    key: string,
    serviceId: string
  ) => {
    const result = await axios
      .patch(
        `/api/dataentities/dev_app_encryptor_config/documents/${serviceId}?_schema=v1`,
        {
          serviceName: serviceName,
          secret: JSON.stringify({
            encryptionKey: key,
          }),
        }
      )
      .then(res => {
        return {
          isError: false,
          data: res.data,
        }
      })
      .catch(err => {
        return {
          isError: true,
          data: err.response.data,
        }
      })
    return result
  }

  const encryptEmail = async (serviceId: string, email: string) => {
    const result = await axios
      .post(
        '/encrypter',
        {
          service: serviceId,
          payload: {
            user: email,
          },
          encryptionFields: ['user'],
          encryptionType: 'AES',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res: any) => {
        return { isError: false, encryptedUserEmail: res.data.user }
      })
      .catch((err: any) => {
        return {
          isError: true,
          data: err.response,
        }
      })

    return result
  }

  const getServiceId = async () => {
    const data = await axios
      .post(
        `/api/dataentities/dev_app_encryptor_config/documents/?_schema=v1`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((result: any) => {
        return {
          isError: false,
          serviceId: `whirlpool_` + result.data.DocumentId,
          documentId: result.data.DocumentId
        }
      })
      .catch((error: any) => {
        return { isError: true, data: error.response.data }
      })
    return data
  }
  switch (e.data.eventName) {
    case 'vtex:pageView': {
      window.adobeDataLayer.push({
        event: 'pageView',
        pageView: {
          eventName: 'vtex:pageView',
          pageTitle: e.data.pageTitle,
          pageUrl: e.data.pageUrl,
          referrer: e.data.referrer,
          accountName: e.data.accountName,
          routeId: e.data.routeId,
          page: e.data.pageUrl.replace(e.origin, ''),
          ...(e.data.pageTitle && {
            title: e.data.pageTitle,
          }),
        },
      })
      break
    }

    case 'vtex:pageInfo': {
      if (e.data.eventType === 'homeView') {
        window.adobeDataLayer.push({
          event: 'homePageInfo',
          homePageInfo: {
            eventType: 'homeView',
          },
        })
      }

      if (e.data.eventType === 'internalSiteSearchView') {
        window.adobeDataLayer.push({
          event: 'searchPageInfo',
          searchPageInfo: {
            eventType: 'internalSiteSearchView',
            department: e.data.department,
            category: e.data.search?.category,
            search: e.data.search,
          },
        })
      }

      break
    }

    case 'vtex:productView': {
      window.adobeDataLayer.push({
        event: 'productView',
        productView: {
          eventName: 'vtex:productView',
          product: {
            brand: e.data.product.brand,
            brandId: e.data.product.brandId,
            categories: e.data.product?.categories,
            categoryId: e.data.product.categoryId,
            categoryTree: {
              id: e.data.product.categoryTree[0].id,
              name: e.data.product.categoryTree[0].name,
            },
            detailUrl: e.data.product.detailUrl,
            items: e.data.product.items,
            linkText: e.data.product.linkText,
            productId: e.data.product.productId,
            productName: e.data.product.productName,
            productReference: e.data.product.productReference,
            selectedSku: e.data.product.selectedSku,
          },
        },
      })
      break
    }

    case 'vtex:productClick': {
      window.adobeDataLayer.push({
        event: 'productClick',
        productClick: {
          eventName: 'vtex:productClick',
          list: e.data.list,
          position: e.data.position,
          product: e.data.product,
        },
      })
      break
    }

    case 'vtex:userData': {
      const additionalData = await requestUserData()

      // eslint-disable-next-line no-console
      console.log({
        additionalData,
        customerClass: additionalData.length
          ? additionalData[0].customerClass
          : null,
      })

      const encryptedEmail = await encryption(e.data?.email)
      window.adobeDataLayer.push({
        event: 'userData',
        userData: {
          eventType: 'userData',
          isAuthenticated: e.data.isAuthenticated,
          userId: e.data?.id,
          userEmail: encryptedEmail ,
          firstName: e.data?.firstName,
          lastName: e.data?.lastName,
          phone: e.data?.phone,
          customerClass: additionalData.length
            ? additionalData[0].customerClass
            : null,
        },
      })
      break
    }

    case 'vtex:cartId': {
      window.adobeDataLayer.push({
        event: 'cartId',
        cartId: {
          eventType: 'cartId',
          cartId: e.data.cartId,
        },
      })
      break
    }

    case 'vtex:productImpression': {
      window.adobeDataLayer.push({
        event: 'productImpression',
        productImpression: {
          eventName: 'vtex:productImpression',
          list: e.data.list,
          impressions: e.data.impressions,
        },
      })
      break
    }

    case 'vtex:addToCart': {
      window.adobeDataLayer.push({
        event: 'addToCart',
        addToCart: {
          eventName: 'vtex:addToCart',
          currency: e.data.currency,
          id: e.data.id,
          items: e.data.items,
        },
        cartChanged: {
          eventName: 'vtex:cartChanged',
          items: e.data.items,
        },
      })
      break
    }

    case 'vtex:removeFromCart': {
      window.adobeDataLayer.push({
        event: 'removeFromCart',
        removeFromCart: {
          eventName: 'vtex:removeFromCart',
          currency: e.data.currency,
          items: e.data.items,
        },
        cartChanged: {
          eventName: 'vtex:cartChanged',
          items: e.data.items,
        },
      })
      break
    }

    case 'vtex:orderPlaced': {
      window.adobeDataLayer.push({
        event: 'orderPlaced',
        orderPlaced: {
          eventName: 'vtex:orderPlaced',
          orders: {
            visitorType: e.data.visitorType,
            country: e.data.visitorAddressCountry,
            state: e.data.visitorAddressState,
            city: e.data.visitorAddressCity,
            neighborhood: e.data.visitorAddressNeighborhood,
            street: e.data.visitorAddressStreet,
            postCode: e.data.visitorAddressPostalCode,
            phone: e.data.visitorContactPhone,
            email: e.data.visitorContactInfo[0],
            firstName: e.data.visitorContactInfo[1],
            lastName: e.data.visitorContactInfo[2],
            shippingEstimate: e.data.transactionLatestShippingEstimate,
            discount: e.data.transactionDiscounts,
            date: e.data.transactionDate,
            transactionId: e.data.transactionId,
            currency: e.data.transactionCurrency,
            transactionTotal: e.data.transactionTotal,
            transactionSubTotal: e.data.transactionSubtotal,
            tax: e.data.transactionTax,
          },
        },
      })
      break
    }

    case 'vtex:promoView': {
      window.adobeDataLayer.push({
        event: 'promoView',
        promoView: {
          eventName: 'vtex:promoView',
          promotions: e.data.promotions,
        },
      })
      break
    }

    case 'vtex:promotionClick': {
      window.adobeDataLayer.push({
        event: 'promotionClick',
        promoClick: {
          eventName: 'vtex:promoClick',
          promotions: e.data.promotions,
        },
      })
      break
    }

    default: {
      break
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
