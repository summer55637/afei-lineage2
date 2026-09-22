/**
 * shop.service.ts — Serviço Angular 2+ para Gerenciamento de Loja e Checkout Cakto
 */

import { CashShopProduct } from '../models/item.model';

export class ShopService {
  private readonly CAKTO_PRODUCTS: Record<string, CashShopProduct> = {
    premium_pass: {
      id: 'premium_pass',
      name: '高級戰鬥通行證',
      priceBRL: 'R$ 15,00',
      checkoutUrl: 'https://pay.cakto.com.br/36g8n4b_1054492',
      desc: '解鎖高級獎勵路線，取得稀有物品、祝福卷軸與專屬外觀。',
      icon: 'gradec/jewels/jewel_blessed_necklace.png',
      badge: '熱門'
    },
    ac_pack_250: {
      id: 'ac_pack_250',
      name: '250 亞丁幣禮包',
      priceBRL: 'R$ 15,00',
      priceAC: 250,
      checkoutUrl: 'https://adenarena.vercel.app',
      desc: '可獲得 250 亞丁幣，用於購買新手禮包、專屬外觀與亞丁商城實用道具。',
      icon: 'gradec/weapons/weapon_samurai_longsword.png',
      badge: '推薦'
    }
  };

  /**
   * Abre o checkout oficial da Cakto em nova aba
   */
  public openCaktoCheckout(productId: string): boolean {
    const product = this.CAKTO_PRODUCTS[productId];
    if (product && product.checkoutUrl) {
      if (typeof window !== 'undefined') {
        window.open(product.checkoutUrl, '_blank');
      }
      return true;
    }
    return false;
  }

  /**
   * Retorna os produtos cadastrados
   */
  public getProducts(): CashShopProduct[] {
    return Object.values(this.CAKTO_PRODUCTS);
  }
}
