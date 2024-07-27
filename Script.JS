document.addEventListener('DOMContentLoaded', () => {
    getMenu();
    document.getElementById('orderButton').addEventListener('click', handleOrder);
});

async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        if (!response.ok) throw new Error('Failed to fetch menu');
        const data = await response.json();
        const menuList = document.getElementById('menuList');
        menuList.innerHTML = data.map(item => `<li>${item.name}: ${item.price}</li>`).join('');
    } catch (error) {
        document.getElementById('status').innerText = 'Error fetching menu';
        document.getElementById('status').classList.add('error');
    }
}

function TakeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const burgers = ["Cheeseburger", "Veggie Burger", "Chicken Burger", "Bacon Burger", "BBQ Burger"];
            const selectedBurgers = [];
            while (selectedBurgers.length < 3) {
                const randomBurger = burgers[Math.floor(Math.random() * burgers.length)];
                if (!selectedBurgers.includes(randomBurger)) {
                    selectedBurgers.push(randomBurger);
                }
            }
            resolve({ burgers: selectedBurgers });
        }, 2500);
    });
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

function thankyouFnc() {
    alert('Thank you for eating with us today!');
}

async function handleOrder() {
    document.getElementById('status').innerText = 'Processing your order...';
    document.getElementById('status').classList.remove('error');
    
    try {
        const order = await TakeOrder();
        document.getElementById('status').innerText = `Order placed: ${order.burgers.join(', ')}`;
        
        const prep = await orderPrep();
        if (prep.order_status) {
            document.getElementById('status').innerText = 'Order is being prepared...';
        }
        
        const payment = await payOrder();
        if (payment.paid) {
            document.getElementById('status').innerText = 'Payment received. Your food is ready!';
            thankyouFnc();
        }
    } catch (error) {
        document.getElementById('status').innerText = 'An error occurred';
        document.getElementById('status').classList.add('error');
    }
}
