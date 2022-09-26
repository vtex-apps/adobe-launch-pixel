import { canUseDOM } from 'vtex.render-runtime'
import type { PixelMessage } from './typings/events'

export function handleEvents(e: PixelMessage) {

  switch (e.data.eventName) {

    case 'vtex:pageView': {
      window.adobeDataLayer.push({
        event: 'pageView', pageView: {
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
      return
    }

    case "vtex:pageInfo": {
      if (e.data.eventType === 'homeView') {
        window.adobeDataLayer.push({
          homePageInfo: {
            eventType: "homeView"
          }
        })
      }
      if (e.data.eventType === "internalSiteSearchView") {
        window.adobeDataLayer.push({
          searchPageInfo: {
            eventType: "internalSiteSearchView",
            department: e.data.department,
            category: e.data.search?.category,
            search: e.data.search,
          }
        })
      }
      return
    }

    case 'vtex:productView': {
      window.adobeDataLayer.push({
        event: 'productView', productView: {
          eventName: 'vtex:productView', product: {
            brand: e.data.product.brand,
            brandId: e.data.product.brandId,
            categories: e.data.product?.categories,
            categoryId: e.data.product.categoryId,
            categoryTree: {
              id: e.data.product.categoryTree[0].id,
              name: e.data.product.categoryTree[0].name
            },
            detailUrl: e.data.product.detailUrl,
            items: e.data.product.items,
            linkText: e.data.product.linkText,
            productId: e.data.product.productId,
            productName: e.data.product.productName,
            productReference: e.data.product.productReference,
            selectedSku: e.data.product.selectedSku,
          }
        }
      })
      return
    }
    case 'vtex:productClick': {
      window.adobeDataLayer.push({
        event: "productClick", productClick: {
          eventName: "vtex:productClick",
          list: e.data.list,
          position: e.data.position,
          product: e.data.product
        },
      })
      return
    }

    case 'vtex:userData': {
      window.adobeDataLayer.push({
        userData: {
          eventType: 'userData',
          isAuthenticated: e.data.isAuthenticated,
          userId: e.data?.id,
          userEmail: e.data?.email,
          firstName: e.data?.firstName,
          lastName: e.data?.lastName,
          phone: e.data?.phone
        }
      })
      return
    }

    case 'vtex:cartId': {
      window.adobeDataLayer.push({
        cartId: {
          eventType: 'cartId',
          cartId: e.data.cartId
        }
      })
      return
    }
    case 'vtex:productImpression': {
      window.adobeDataLayer.push({
        event: 'productImpression', productImpression: {
          eventName: 'vtex:productImpression',
          list: e.data.list,
          impressions: e.data.impressions,
        },
      })
      return
    }

    case 'vtex:addToCart': {
      window.adobeDataLayer.push({
        event: "addToCart",
        addToCart: {
          eventName: "vtex:addToCart",
          currency: e.data.currency,
          id: e.data.id,
          items: e.data.items
        }, cartChanged: {
          eventName: "vtex:cartChanged",
          items: e.data.items
        },
      })
      return
    }
    case 'vtex:removeFromCart': {
      window.adobeDataLayer.push({
        event: 'removeFromCart',
         removeFromCart: {
          eventName: 'vtex:removeFromCart',
          currency: e.data.currency,
          items: e.data.items
        }, cartChanged: {
          eventName: 'vtex:cartChanged',
          items: e.data.items,
        },
      })
      return
    }
    case 'vtex:orderPlaced': {
      window.adobeDataLayer.push({
        event: 'orderPlaced', orderPlaced: {
          eventName: 'vtex:orderPlaced'
        }
      })
      return
    }
    case 'vtex:promoView': {
      window.adobeDataLayer.push({
        event: 'promoView', promoView: {
          eventName: "vtex:promoView",
          promotions: e.data.promotions
        }
      })
      return
    }

    case 'vtex:promotionClick': {
      window.adobeDataLayer.push({
        event: 'promotionClick', promoClick: {
          eventName: "vtex:promoClick",
          promotions: e.data.promotions
        }
      })
      return
    }

    default: {
      break
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}