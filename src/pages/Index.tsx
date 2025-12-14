import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    format: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      product: '',
      format: '',
      message: ''
    });
  };

  const products = [
    {
      title: 'Печать на холстах',
      description: 'Превратите ваши фото в настоящие произведения искусства',
      formats: ['A4 (21×30 см)', 'A3 (30×42 см)', 'A2 (42×59 см)', 'A1 (59×84 см)'],
      icon: 'Image',
      image: '/placeholder.svg'
    },
    {
      title: 'Печать на кружках',
      description: 'Персональные кружки с вашими любимыми изображениями',
      formats: ['Стандартная (330 мл)', 'Большая (450 мл)', 'Термо-кружка'],
      icon: 'Coffee',
      image: '/placeholder.svg'
    },
    {
      title: 'Печать на футболках',
      description: 'Уникальные футболки с вашим дизайном',
      formats: ['S', 'M', 'L', 'XL', 'XXL'],
      icon: 'Shirt',
      image: '/placeholder.svg'
    }
  ];

  const portfolio = [
    { id: 1, title: 'Пейзаж на холсте A2', category: 'Холст', image: 'https://cdn.poehali.dev/projects/93ce0319-0dd7-4336-b7cd-64e06e4bd7c3/files/1b5e1d45-d72d-4a6c-9940-421de60ff91a.jpg' },
    { id: 2, title: 'Семейное фото на кружке', category: 'Кружка', image: 'https://cdn.poehali.dev/projects/93ce0319-0dd7-4336-b7cd-64e06e4bd7c3/files/8066f5b1-880b-4618-b07b-8f36fce6924b.jpg' },
    { id: 3, title: 'Дизайнерская футболка', category: 'Футболка', image: 'https://cdn.poehali.dev/projects/93ce0319-0dd7-4336-b7cd-64e06e4bd7c3/files/6cbd25e2-f20f-4d25-9424-b787452cb7ed.jpg' },
    { id: 4, title: 'Портрет на холсте A1', category: 'Холст', image: 'https://cdn.poehali.dev/projects/93ce0319-0dd7-4336-b7cd-64e06e4bd7c3/files/1b5e1d45-d72d-4a6c-9940-421de60ff91a.jpg' },
    { id: 5, title: 'Корпоративная кружка', category: 'Кружка', image: 'https://cdn.poehali.dev/projects/93ce0319-0dd7-4336-b7cd-64e06e4bd7c3/files/8066f5b1-880b-4618-b07b-8f36fce6924b.jpg' },
    { id: 6, title: 'Футболка с логотипом', category: 'Футболка', image: 'https://cdn.poehali.dev/projects/93ce0319-0dd7-4336-b7cd-64e06e4bd7c3/files/6cbd25e2-f20f-4d25-9424-b787452cb7ed.jpg' }
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            ПРИНТАРТ
          </h1>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a>
            <a href="#order" className="hover:text-primary transition-colors">Заказать</a>
          </nav>
          <Button onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}>
            Связаться
          </Button>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 z-10 text-center animate-fade-in">
          <div className="mb-8 animate-float">
            <h2 className="text-7xl md:text-9xl font-extrabold mb-4 tracking-tight">
              <span className="inline-block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-2xl" 
                style={{ 
                  textShadow: '0 10px 40px rgba(14, 165, 233, 0.3)',
                  transform: 'perspective(1000px) rotateX(5deg)'
                }}>
                ПРИНТАРТ
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Воплощаем ваши идеи в реальность с помощью высококачественной печати
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              Наши услуги
              <Icon name="ArrowDown" className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6"
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}>
              Заказать сейчас
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Довольных клиентов</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Выполненных заказов</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-4xl font-bold text-primary mb-2">24ч</div>
              <div className="text-sm text-muted-foreground">Скорость производства</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Наши услуги
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Профессиональная печать на различных носителях с гарантией качества
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in border-2"
                style={{ animationDelay: `${index * 0.2}s` }}>
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Icon name={product.icon as any} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">{product.title}</CardTitle>
                  <CardDescription className="text-base">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-semibold text-primary mb-3">Доступные форматы:</p>
                    {product.formats.map((format, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Icon name="CheckCircle2" size={16} className="text-primary" />
                        <span>{format}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6" variant="outline"
                    onClick={() => {
                      setFormData({ ...formData, product: product.title });
                      document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                    Заказать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Примеры работ
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Взгляните на наши лучшие проекты и убедитесь в качестве
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.map((item, index) => (
              <div key={item.id} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <div className="text-xs font-semibold text-primary mb-1">{item.category}</div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Оформить заказ
            </h2>
            <p className="text-xl text-muted-foreground">
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </p>
          </div>

          <Card className="shadow-2xl border-2 animate-scale-in">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product">Тип продукта *</Label>
                    <select
                      id="product"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      required
                    >
                      <option value="">Выберите продукт</option>
                      <option value="Печать на холстах">Печать на холстах</option>
                      <option value="Печать на кружках">Печать на кружках</option>
                      <option value="Печать на футболках">Печать на футболках</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="format">Формат/Размер *</Label>
                    <Input
                      id="format"
                      placeholder="A4, A3, M, L и т.д."
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Комментарий к заказу</Label>
                  <Textarea
                    id="message"
                    placeholder="Расскажите подробнее о вашем заказе..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full text-lg py-6 shadow-lg hover:shadow-xl">
                  Отправить заявку
                  <Icon name="Send" className="ml-2" size={20} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-primary/5 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ПРИНТАРТ
              </h3>
              <p className="text-muted-foreground">
                Профессиональная печать на холстах, кружках и футболках с 2020 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@printart.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>Москва, ул. Примерная, 123</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Мы в соцсетях</h4>
              <div className="flex gap-4">
                <Button size="icon" variant="outline" className="rounded-full">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>© 2024 ПРИНТАРТ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;