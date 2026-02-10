from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from apps.users.models import User, Address
from apps.stores.models import Store
from apps.products.models import Product, Inventory
from apps.orders.models import Coupon


class Command(BaseCommand):
    help = 'Populate database with sample data for testing buyer flow'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')
        
        # Create users
        buyer1 = self.create_buyer()
        buyer2 = self.create_buyer(username='buyer2', phone='+919876543211')
        
        seller1 = self.create_seller()
        seller2 = self.create_seller(username='seller2', phone='+919876543213')
        
        rider1 = self.create_rider()
        
        # Create addresses for buyers
        self.create_addresses(buyer1)
        self.create_addresses(buyer2)
        
        # Create stores
        store1 = self.create_store(seller1, 'Sharma Kirana Store')
        store2 = self.create_store(seller2, 'Gupta General Store')
        
        # Create products
        products = self.create_products()
        
        # Create inventory for stores
        self.create_inventory(store1, products)
        self.create_inventory(store2, products)
        
        # Create coupons
        self.create_coupons()
        
        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))
        self.stdout.write(f'Buyers: buyer1, buyer2 (password: test123)')
        self.stdout.write(f'Sellers: seller1, seller2 (password: test123)')
        self.stdout.write(f'Riders: rider1 (password: test123)')
        
    def create_buyer(self, username='buyer1', phone='+919876543210'):
        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                'email': f'{username}@example.com',
                'phone': phone,
                'role': 'buyer',
                'is_phone_verified': True,
            }
        )
        if created:
            user.set_password('test123')
            user.save()
            self.stdout.write(f'Created buyer: {username}')
        return user
    
    def create_seller(self, username='seller1', phone='+919876543212'):
        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                'email': f'{username}@example.com',
                'phone': phone,
                'role': 'seller',
                'is_phone_verified': True,
            }
        )
        if created:
            user.set_password('test123')
            user.save()
            self.stdout.write(f'Created seller: {username}')
        return user
    
    def create_rider(self, username='rider1', phone='+919876543214'):
        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                'email': f'{username}@example.com',
                'phone': phone,
                'role': 'rider',
                'is_phone_verified': True,
            }
        )
        if created:
            user.set_password('test123')
            user.save()
            self.stdout.write(f'Created rider: {username}')
        return user
    
    def create_addresses(self, user):
        Address.objects.get_or_create(
            user=user,
            type='home',
            defaults={
                'full_name': user.username,
                'phone': user.phone,
                'address_line1': '123 MG Road',
                'landmark': 'Near Metro Station',
                'city': 'Bengaluru',
                'state': 'Karnataka',
                'pincode': '560001',
                'latitude': 12.9716,
                'longitude': 77.5946,
                'is_default': True,
            }
        )
        Address.objects.get_or_create(
            user=user,
            type='work',
            defaults={
                'full_name': user.username,
                'phone': user.phone,
                'address_line1': '456 Koramangala',
                'landmark': 'Near Forum Mall',
                'city': 'Bengaluru',
                'state': 'Karnataka',
                'pincode': '560095',
                'latitude': 12.9352,
                'longitude': 77.6245,
                'is_default': False,
            }
        )
    
    def create_store(self, owner, name):
        store, created = Store.objects.get_or_create(
            owner=owner,
            defaults={
                'name': name,
                'description': f'Your friendly neighborhood {name}',
                'phone': owner.phone,
                'email': owner.email,
                'address_line1': '789 Commercial Street',
                'city': 'Bengaluru',
                'state': 'Karnataka',
                'pincode': '560002',
                'latitude': 12.9716,
                'longitude': 77.5946,
                'is_active': True,
                'is_verified': True,
                'rating': 4.5,
                'total_reviews': 120,
            }
        )
        if created:
            self.stdout.write(f'Created store: {name}')
        return store
    
    def create_products(self):
        products_data = [
            # Vegetables
            ('Tomato', 'vegetables', 50, 'kg', 1, 'Fresh red tomatoes'),
            ('Onion', 'vegetables', 40, 'kg', 1, 'Fresh onions'),
            ('Potato', 'vegetables', 30, 'kg', 1, 'Farm fresh potatoes'),
            ('Carrot', 'vegetables', 45, 'kg', 1, 'Fresh carrots'),
            
            # Fruits
            ('Apple', 'fruits', 150, 'kg', 1, 'Fresh Shimla apples'),
            ('Banana', 'fruits', 50, 'dozen', 1, 'Fresh bananas'),
            ('Orange', 'fruits', 80, 'kg', 1, 'Fresh oranges'),
            
            # Dairy
            ('Milk', 'dairy', 60, 'l', 1, 'Fresh cow milk'),
            ('Curd', 'dairy', 50, 'kg', 0.5, 'Fresh curd'),
            ('Butter', 'dairy', 500, 'kg', 0.5, 'Amul butter'),
            
            # Snacks
            ('Lays Chips', 'snacks', 20, 'packet', 1, 'Classic salted'),
            ('Biscuits', 'snacks', 40, 'packet', 1, 'Parle-G biscuits'),
            
            # Beverages
            ('Coca Cola', 'beverages', 40, 'l', 1, 'Cold drink'),
            ('Water Bottle', 'beverages', 20, 'l', 1, 'Mineral water'),
        ]
        
        products = []
        for name, category, mrp, unit, qty, desc in products_data:
            product, created = Product.objects.get_or_create(
                name=name,
                category=category,
                defaults={
                    'description': desc,
                    'mrp': mrp,
                    'unit': unit,
                    'quantity': qty,
                    'is_active': True,
                }
            )
            products.append(product)
            if created:
                self.stdout.write(f'Created product: {name}')
        
        return products
    
    def create_inventory(self, store, products):
        for product in products:
            Inventory.objects.get_or_create(
                store=store,
                product=product,
                defaults={
                    'in_stock': True,
                    'stock_quantity': 100,
                    'low_stock_threshold': 10,
                    'price': product.mrp,
                    'discount_percentage': 10,
                }
            )
    
    def create_coupons(self):
        now = timezone.now()
        
        Coupon.objects.get_or_create(
            code='SAVE30',
            defaults={
                'description': '30 rupees off on orders above ₹99',
                'discount_amount': 30,
                'min_order_value': 99,
                'valid_from': now,
                'valid_to': now + timedelta(days=30),
                'is_active': True,
            }
        )
        
        Coupon.objects.get_or_create(
            code='FIRST50',
            defaults={
                'description': '50% off on first order',
                'discount_percentage': 50,
                'min_order_value': 100,
                'max_discount': 100,
                'valid_from': now,
                'valid_to': now + timedelta(days=30),
                'usage_limit': 1,
                'is_active': True,
            }
        )
        
        self.stdout.write('Created coupons: SAVE30, FIRST50')
