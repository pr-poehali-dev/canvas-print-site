import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PriceCalculator = () => {
  const [product, setProduct] = useState('canvas');
  const [format, setFormat] = useState('a4');
  const [quantity, setQuantity] = useState(1);

  const prices = {
    canvas: {
      a4: 1500,
      a3: 2500,
      a2: 4000,
      a1: 6500,
    },
    mug: {
      standard: 800,
      large: 1200,
      thermo: 1500,
    },
    tshirt: {
      s: 1200,
      m: 1200,
      l: 1300,
      xl: 1400,
      xxl: 1500,
    }
  };

  const productNames: { [key: string]: string } = {
    canvas: 'Печать на холстах',
    mug: 'Печать на кружках',
    tshirt: 'Печать на футболках'
  };

  const formatNames: { [key: string]: { [key: string]: string } } = {
    canvas: {
      a4: 'A4 (21×30 см)',
      a3: 'A3 (30×42 см)',
      a2: 'A2 (42×59 см)',
      a1: 'A1 (59×84 см)',
    },
    mug: {
      standard: 'Стандартная (330 мл)',
      large: 'Большая (450 мл)',
      thermo: 'Термо-кружка',
    },
    tshirt: {
      s: 'S',
      m: 'M',
      l: 'L',
      xl: 'XL',
      xxl: 'XXL',
    }
  };

  const getPrice = () => {
    const basePrice = prices[product as keyof typeof prices][format as keyof typeof prices.canvas];
    const discount = quantity >= 10 ? 0.15 : quantity >= 5 ? 0.1 : 0;
    const total = basePrice * quantity * (1 - discount);
    return { basePrice, discount: discount * 100, total };
  };

  const { basePrice, discount, total } = getPrice();

  return (
    <Card className="shadow-2xl border-2 animate-scale-in">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <Icon name="Calculator" size={24} className="text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl">Калькулятор стоимости</CardTitle>
            <CardDescription>Рассчитайте примерную цену вашего заказа</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="calc-product">Тип продукта</Label>
          <select
            id="calc-product"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
            value={product}
            onChange={(e) => {
              setProduct(e.target.value);
              setFormat(Object.keys(formatNames[e.target.value])[0]);
            }}
          >
            <option value="canvas">Печать на холстах</option>
            <option value="mug">Печать на кружках</option>
            <option value="tshirt">Печать на футболках</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="calc-format">Формат/Размер</Label>
          <select
            id="calc-format"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            {Object.entries(formatNames[product]).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="calc-quantity">Количество</Label>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Icon name="Minus" size={16} />
            </Button>
            <input
              id="calc-quantity"
              type="number"
              min="1"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-center font-semibold text-lg"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
        </div>

        {discount > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-3">
            <Icon name="Tag" className="text-primary" size={24} />
            <div>
              <div className="font-semibold text-primary">Скидка {discount}%</div>
              <div className="text-sm text-muted-foreground">
                {quantity >= 10 ? 'За заказ от 10 шт' : 'За заказ от 5 шт'}
              </div>
            </div>
          </div>
        )}

        <div className="border-t pt-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Цена за единицу:</span>
            <span className="font-semibold">{basePrice.toLocaleString('ru-RU')} ₽</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Скидка:</span>
              <span className="text-primary font-semibold">-{discount}%</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-3 border-t">
            <span className="text-lg font-semibold">Итого:</span>
            <span className="text-3xl font-bold text-primary">{Math.round(total).toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={() => {
            const orderSection = document.getElementById('order');
            if (orderSection) {
              orderSection.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => {
                const productSelect = document.getElementById('product') as HTMLSelectElement;
                const formatInput = document.getElementById('format') as HTMLInputElement;
                if (productSelect) productSelect.value = productNames[product];
                if (formatInput) formatInput.value = formatNames[product][format];
              }, 500);
            }
          }}
        >
          Заказать {productNames[product]}
          <Icon name="ArrowRight" className="ml-2" size={20} />
        </Button>

        <div className="text-xs text-muted-foreground text-center">
          * Цены указаны ориентировочно. Точная стоимость зависит от сложности заказа.
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCalculator;
