document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('diet-form');
    const inputSection = document.getElementById('input-section');
    const loadingSection = document.getElementById('loading-section');
    const resultSection = document.getElementById('result-section');
    const btnGenerateAgain = document.getElementById('generate-again-btn');
    const grocerySection = document.getElementById('grocery-section');
    const btnViewGrocery = document.getElementById('view-grocery-btn');
    const btnBackToPlan = document.getElementById('back-to-plan-btn');
    const groceryListContainer = document.getElementById('grocery-list-container');

    // Result UI targets
    const calorieTargetEl = document.getElementById('calorie-target');
    const waterTargetEl = document.getElementById('water-target');
    const daysNavEl = document.getElementById('days-nav');
    const mealsDisplayEl = document.getElementById('meals-display');

    // Diet Databases organized by Region -> Preference
    const dietDB = {
        'kerala': {
            'any': {
                'breakfast': [
                    { name: 'Puttu & Kadala Curry', desc: 'Steamed rice cylinder with black chickpea curry.' },
                    { name: 'Appam and Egg Roast', desc: 'Rice pancake with spicy egg roast.' },
                    { name: 'Idiyappam with Chicken Stew', desc: 'String hoppers with mild chicken stew.' },
                    { name: 'Dosa with Sambar & Chutney', desc: 'Crispy rice crepe with lentil soup and coconut chutney.' }
                ],
                'lunch': [
                    { name: 'Kerala Meals with Fish Curry', desc: 'Red rice, fish curry (Meen Curry), cabbage thoran.' },
                    { name: 'Chicken Biryani (Portion Controlled)', desc: 'Small portion of Kerala style chicken biryani with raita.' },
                    { name: 'Brown Rice & Beef Ularthiyathu', desc: 'Small serving of brown rice with lean beef roast and salad.' }
                ],
                'dinner': [
                    { name: 'Kanji & Payar', desc: 'Rice porridge with green gram and papad.' },
                    { name: 'Chapati & Minced Chicken Curry', desc: 'Wheat flatbreads with light chicken tomato gravy.' },
                    { name: 'Grilled Fish with Veg Salad', desc: 'Karimeen Pollichathu or grilled fish with cucumber salad.' }
                ]
            },
            'veg': {
                'breakfast': [
                    { name: 'Puttu & Kadala Curry', desc: 'Steamed rice cylinder with black chickpea curry.' },
                    { name: 'Appam with Veg Stew', desc: 'Rice pancake with mild vegetable stew.' },
                    { name: 'Idli & Sambar', desc: 'Steamed rice cakes with lentil and vegetable soup.' },
                    { name: 'Upma with Banana', desc: 'Semolina savory porridge with a ripe banana.' }
                ],
                'lunch': [
                    { name: 'Kerala Veg Meals', desc: 'Red rice, Sambar, Avial, Thoran, and Moru curry.' },
                    { name: 'Brown Rice with Dal & Pappadam', desc: 'Brown rice, moong dal curry, beans thoran.' },
                    { name: 'Chapati and Paneer Curry', desc: 'Whole wheat chapati with paneer masala.' }
                ],
                'dinner': [
                    { name: 'Kanji & Payar', desc: 'Rice porridge with boiled green gram.' },
                    { name: 'Chapati & Mix Veg Kurma', desc: 'Wheat flatbreads with rich vegetable coconut curry.' },
                    { name: 'Oats Upma with Veggies', desc: 'Rolled oats cooked with carrots, beans, and peas.' }
                ]
            },
            'vegan': {
                'breakfast': [
                    { name: 'Puttu & Kadala Curry', desc: 'Steamed rice cylinder with black chickpea curry.' },
                    { name: 'Idiyappam with Coconut Milk', desc: 'String hoppers with sweetened or plain coconut milk.' },
                    { name: 'Dosa & Sambar', desc: 'Crispy fermented crepe with lentil soup.' }
                ],
                'lunch': [
                    { name: 'Red Rice & Avial', desc: 'Traditional red rice with mixed veg and coconut paste (no curd).' },
                    { name: 'Brown Rice & Soya Chunks Fry', desc: 'Brown rice with protein-rich soya chunks dry fry.' },
                    { name: 'Cabbage Thoran & Dal', desc: 'Stir fried cabbage with coconut and lentil soup.' }
                ],
                'dinner': [
                    { name: 'Kanji & Payar', desc: 'Rice porridge with roasted green gram.' },
                    { name: 'Chapati & Chana Masala', desc: 'Wheat breads with chickpea curry.' },
                    { name: 'Rice Noodle Salad', desc: 'Idiyappam tossed with fresh veggies and lime dressing.' }
                ]
            }
        },
        'north_indian': {
            'any': {
                'breakfast': [
                    { name: 'Poha with Egg Bhurji', desc: 'Flattened rice with peas and scrambled spiced eggs.' },
                    { name: 'Stuffed Paratha with Curd', desc: 'Aloo or Gobi paratha cooked with minimal oil.' },
                    { name: 'Besan Chilla & Boiled Eggs', desc: 'Gram flour pancake with 2 whole boiled eggs.' }
                ],
                'lunch': [
                    { name: 'Roti, Dal Tadka & Chicken Tikka', desc: 'Whole wheat flatbread, lentils, and grilled chicken.' },
                    { name: 'Jeera Rice & Fish Curry', desc: 'Cumin flavored rice with spicy fish gravy.' },
                    { name: 'Roti & Mutton Rogan Josh', desc: 'Flatbread with lean mutton curry.' }
                ],
                'dinner': [
                    { name: 'Grilled Chicken & Salad', desc: 'Tandoori chicken breast with kachumber salad.' },
                    { name: 'Roti & Bhindi Masala', desc: 'Flatbread with okra stir fry.' },
                    { name: 'Egg Curry & Quinoa', desc: 'Light egg gravy served with quinoa or brown rice.' }
                ]
            },
            'veg': {
                'breakfast': [
                    { name: 'Poha with Peanuts', desc: 'Flattened rice tempered with mustard, curry leaves & peanuts.' },
                    { name: 'Besan Chilla', desc: 'Savory gram flour pancakes with mint chutney.' },
                    { name: 'Dalia (Broken Wheat) Upma', desc: 'Savory porridge packed with vegetables.' }
                ],
                'lunch': [
                    { name: 'Roti, Dal Makhani & Sabzi', desc: 'Whole wheat roti, lentils, and mixed veg dry curry.' },
                    { name: 'Rajma Chawal', desc: 'Kidney bean curry with small portion of rice.' },
                    { name: 'Roti & Paneer Bhurji', desc: 'Flatbread with scrambled spiced cottage cheese.' }
                ],
                'dinner': [
                    { name: 'Roti & Palak Paneer', desc: 'Flatbread with spinach and cottage cheese gravy.' },
                    { name: 'Moong Dal Chilla', desc: 'Lentil pancakes with garlic chutney.' },
                    { name: 'Khichdi with Curd', desc: 'Comforting rice and lentil mash with a side of yogurt.' }
                ]
            },
            'vegan': {
                'breakfast': [
                    { name: 'Poha with Peanuts', desc: 'Flattened rice cooked with turmeric, onions, and peanuts.' },
                    { name: 'Besan Chilla', desc: 'Gram flour pancakes cooked in vegetable oil.' },
                    { name: 'Dalia', desc: 'Savoury broken wheat porridge with vegetables.' }
                ],
                'lunch': [
                    { name: 'Roti, Chana Masala & Salad', desc: 'Wheat flatbread, chickpea curry, cucumber salad.' },
                    { name: 'Rajma & Brown Rice', desc: 'Kidney beans cooked in tomato gravy with brown rice.' },
                    { name: 'Roti & Aloo Gobi', desc: 'Flatbread with potato and cauliflower stir fry.' }
                ],
                'dinner': [
                    { name: 'Roti & Baingan Bharta', desc: 'Smoked eggplant mash with flatbread.' },
                    { name: 'Tofu Bhurji & Roti', desc: 'Scrambled spiced tofu with wheat flatbread.' },
                    { name: 'Moong Dal & Salad', desc: 'Light lentil soup with a large green salad.' }
                ]
            }
        },
        'global': {
            'any': {
                'breakfast': [
                    { name: 'Oatmeal with Protein Powder & Berries', desc: 'Rolled oats cooked in water or milk, berries, and whey.' },
                    { name: 'Scrambled Eggs on Whole Wheat Toast', desc: '3 eggs scrambled with spinach on toasted bread.' },
                    { name: 'Greek Yogurt Parfait', desc: 'Yogurt, granola, and sliced almonds.' }
                ],
                'lunch': [
                    { name: 'Grilled Chicken Salad', desc: 'Mixed greens, cherry tomatoes, cucumbers, balsamic vinaigrette.' },
                    { name: 'Turkey & Hummus Wrap', desc: 'Whole wheat tortilla, sliced turkey breast, hummus, veggies.' },
                    { name: 'Tuna Salad on Crackers', desc: 'Light canned tuna mixed with greek yogurt on whole grain crackers.' }
                ],
                'dinner': [
                    { name: 'Baked Salmon with Asparagus', desc: 'Salmon fillet baked with lemon and pepper, steamed asparagus.' },
                    { name: 'Lean Steak with Sweet Potato', desc: 'Grilled sirloin with half a baked sweet potato.' },
                    { name: 'Zucchini Noodles with Meatballs', desc: 'Zoodles topped with marinara and lean turkey meatballs.' }
                ]
            },
            'veg': {
                'breakfast': [
                    { name: 'Oatmeal with chia seeds & Berries', desc: 'Rolled oats with chia and fresh berries.' },
                    { name: 'Avocado Toast', desc: 'Mashed avocado on whole wheat toast with a sprinkle of chili flakes.' },
                    { name: 'Greek Yogurt with Nuts', desc: 'High protein yogurt with walnuts and honey.' }
                ],
                'lunch': [
                    { name: 'Quinoa & Black Bean Bowl', desc: 'Quinoa, black beans, corn, salsa, and avocado.' },
                    { name: 'Paneer/Tofu Caesar Salad', desc: 'Romaine lettuce, croutons, parmesan, and grilled tofu/paneer.' },
                    { name: 'Lentil Soup with Crusty Bread', desc: 'Hearty lentil and vegetable soup.' }
                ],
                'dinner': [
                    { name: 'Stir-fried Tofu & Veggies', desc: 'Broccoli, bell peppers, and tofu in a light soy-ginger sauce.' },
                    { name: 'Stuffed Bell Peppers', desc: 'Peppers stuffed with brown rice, beans, and cheese.' },
                    { name: 'Veggie Burger (No Bun)', desc: 'Black bean patty served with a large side salad.' }
                ]
            },
            'vegan': {
                'breakfast': [
                    { name: 'Oatmeal with Almond Milk', desc: 'Rolled oats, almond milk, sliced banana, and walnuts.' },
                    { name: 'Avocado Toast', desc: 'Mashed avocado on whole wheat sourdough.' },
                    { name: 'Smoothie Bowl', desc: 'Blended mixed berries, spinach, and plant protein powder.' }
                ],
                'lunch': [
                    { name: 'Chickpea Salad Wrap', desc: 'Mashed chickpeas with vegan mayo, wrapped in a tortilla with greens.' },
                    { name: 'Buddha Bowl', desc: 'Quinoa, roasted sweet potatoes, kale, and tahini dressing.' },
                    { name: 'Lentil Soup', desc: 'Thick lentil soup with carrots and celery.' }
                ],
                'dinner': [
                    { name: 'Tofu Stir-fry', desc: 'Extra firm tofu cubes tossed with broccoli and teriyaki sauce.' },
                    { name: 'Vegan Chili', desc: 'Kidney beans, black beans, tomatoes, and spices.' },
                    { name: 'Zucchini Noodles with Lentil Bolognese', desc: 'Zoodles coated in a rich lentil tomato sauce.' }
                ]
            }
        }
    };

    let currentWeeklyPlan = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather Inputs
        const age = parseInt(document.getElementById('age').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const gender = document.getElementById('gender').value;
        const activity = document.getElementById('activity').value;
        const goalSpeed = document.getElementById('goal-speed').value;
        const foodPref = document.getElementById('food-pref').value;
        const region = document.getElementById('region').value;

        // Perform Calculations
        const stats = calculateDietStats(age, weight, height, gender, activity, goalSpeed);
        
        // Generate Weekly Plan
        currentWeeklyPlan = generateWeeklyPlan(region, foodPref);
        generateGroceryList(region, foodPref);

        // UI transitions
        switchSection(inputSection, loadingSection);
        
        setTimeout(() => {
            populateResults(stats);
            switchSection(loadingSection, resultSection);
        }, 1500); // Fake load for visual effect
    });

    btnGenerateAgain.addEventListener('click', () => {
        switchSection(resultSection, inputSection);
        switchSection(grocerySection, inputSection); // Just in case they are here
    });

    btnViewGrocery.addEventListener('click', () => {
        switchSection(resultSection, grocerySection);
    });

    btnBackToPlan.addEventListener('click', () => {
        switchSection(grocerySection, resultSection);
    });

    function generateGroceryList(region, foodPref) {
        const lists = {
            'kerala': {
                'any': ['Matta (Red) Rice', 'Chicken Breast', 'Eggs', 'Fresh Fish (Mathi/Ayala)', 'Coconut / Coconut Milk', 'Puttu Podi (Rice Flour)', 'Black Chickpeas (Kadala)', 'Cabbage & Carrots', 'Onions & Tomatoes', 'Minimal Coconut Oil', 'Spices (Chili, Coriander, Turmeric)'],
                'veg': ['Matta (Red) Rice', 'Paneer', 'Green Gram (Cherupayar)', 'Coconut / Coconut Milk', 'Puttu Podi', 'Black Chickpeas', 'Assorted Veggies (Carrot, Beans, Drumstick, Ash Gourd)', 'Onions & Tomatoes', 'Yogurt/Curd', 'Wheat Flour (Atta)'],
                'vegan': ['Matta (Red) Rice', 'Soya Chunks', 'Green Gram (Cherupayar)', 'Coconut Milk', 'Puttu Podi', 'Black Chickpeas', 'Assorted Vegetables', 'Onions & Tomatoes', 'Idiyappam Flour', 'Cooking Oil']
            },
            'north_indian': {
                'any': ['Whole Wheat Flour (Atta)', 'Eggs', 'Chicken Breast', 'Lean Mutton/Fish', 'Poha (Flattened Rice)', 'Besan (Gram Flour)', 'Moong Dal & Masoor Dal', 'Paneer', 'Mixed Veggies (Spinach, Okra, Cauliflower)', 'Onions & Tomatoes', 'Yogurt/Curd'],
                'veg': ['Whole Wheat Flour (Atta)', 'Poha', 'Besan (Gram Flour)', 'Dalia (Broken Wheat)', 'Moong Dal & Toor Dal', 'Rajma (Kidney Beans)', 'Paneer', 'Mixed Veggies', 'Yogurt/Curd', 'Ghee/Oil (Minimal)'],
                'vegan': ['Whole Wheat Flour (Atta)', 'Poha', 'Besan', 'Dalia', 'Moong Dal', 'Rajma & Chana', 'Tofu', 'Mixed Veggies (Eggplant, Potato, Cauliflower)', 'Spinach/Greens', 'Oil']
            },
            'global': {
                'any': ['Rolled Oats', 'Eggs', 'Chicken Breast', 'Canned Tuna / Fresh Salmon', 'Whole Wheat Bread/Wraps', 'Greek Yogurt', 'Mixed Berries', 'Almonds & Chia Seeds', 'Salad Greens (Spinach/Romaine)', 'Cherry Tomatoes & Cucumbers', 'Sweet Potatoes'],
                'veg': ['Rolled Oats', 'Whole Wheat Bread/Wraps', 'Greek Yogurt', 'Paneer / Tofu', 'Quinoa', 'Black Beans / Chickpeas', 'Mixed Berries', 'Nuts & Seeds', 'Salad Greens', 'Bell Peppers & Broccoli', 'Avocado'],
                'vegan': ['Rolled Oats', 'Almond/Soy Milk', 'Whole Wheat Sourdough/Wraps', 'Extra Firm Tofu', 'Quinoa', 'Black Beans & Lentils', 'Mixed Berries', 'Walnuts & Chia Seeds', 'Salad Greens', 'Avocado', 'Plant Protein Powder']
            }
        };

        const items = lists[region] && lists[region][foodPref] ? lists[region][foodPref] : lists['global']['any'];
        
        groceryListContainer.innerHTML = '';
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'grocery-item';
            div.innerHTML = `
                <div class="grocery-checkbox"></div>
                <span>${item}</span>
            `;
            div.addEventListener('click', () => {
                div.classList.toggle('checked');
            });
            groceryListContainer.appendChild(div);
        });
    }

    function calculateDietStats(age, weight, height, gender, activity, goalSpeed) {
        // BMR Calculation (Mifflin-St Jeor)
        let bmr;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        // TDEE Multiplier
        let multiplier = 1.2; // sedentary
        if (activity === 'light') multiplier = 1.375;
        if (activity === 'moderate') multiplier = 1.55;
        if (activity === 'active') multiplier = 1.725;

        const tdee = bmr * multiplier;

        let deficit = 0;
        if (goalSpeed === 'slow') deficit = 275;      // ~0.25 kg/wk
        if (goalSpeed === 'normal') deficit = 550;    // ~0.5 kg/wk
        if (goalSpeed === 'fast') deficit = 825;      // ~0.75 kg/wk

        let targetCalories = tdee - deficit;

        // Safety limit 
        if (targetCalories < 1200) targetCalories = 1200;

        // Water intake (roughly 33ml per kg of body weight)
        let waterLiters = (weight * 0.033).toFixed(1);
        if (activity === 'moderate' || activity === 'active') {
            waterLiters = (parseFloat(waterLiters) + 0.5).toFixed(1);
        }

        return {
            calories: Math.round(targetCalories),
            water: waterLiters
        };
    }

    function generateWeeklyPlan(region, foodPref) {
        const db = dietDB[region] && dietDB[region][foodPref] ? dietDB[region][foodPref] : dietDB['global']['any'];
        
        const plan = [];
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        days.forEach(day => {
            const breakfast = db.breakfast[Math.floor(Math.random() * db.breakfast.length)];
            const lunch = db.lunch[Math.floor(Math.random() * db.lunch.length)];
            const dinner = db.dinner[Math.floor(Math.random() * db.dinner.length)];

            plan.push({
                day: day,
                meals: {
                    breakfast,
                    lunch,
                    dinner
                }
            });
        });

        return plan;
    }

    function populateResults(stats) {
        calorieTargetEl.textContent = `${stats.calories} kcal`;
        waterTargetEl.textContent = `${stats.water} Liters`;

        daysNavEl.innerHTML = '';
        currentWeeklyPlan.forEach((planItem, index) => {
            const btn = document.createElement('button');
            btn.className = `day-btn ${index === 0 ? 'active' : ''}`;
            btn.textContent = planItem.day;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderDayMeals(index);
            });
            daysNavEl.appendChild(btn);
        });

        renderDayMeals(0);
    }

    function renderDayMeals(dayIndex) {
        const dayPlan = currentWeeklyPlan[dayIndex].meals;
        mealsDisplayEl.innerHTML = ''; 

        const mealTypes = [
            { type: 'breakfast', label: 'Breakfast', data: dayPlan.breakfast },
            { type: 'lunch', label: 'Lunch', data: dayPlan.lunch },
            { type: 'dinner', label: 'Dinner', data: dayPlan.dinner }
        ];

        mealTypes.forEach((meal, i) => {
            const card = document.createElement('div');
            card.className = `meal-card ${meal.type}`;
            card.style.animationDelay = `${i * 0.1}s`;

            card.innerHTML = `
                <div class="meal-time">${meal.label}</div>
                <div class="meal-details">
                    <h4>${meal.data.name}</h4>
                    <p>${meal.data.desc}</p>
                </div>
            `;
            mealsDisplayEl.appendChild(card);
        });
    }

    function switchSection(fromEl, toEl) {
        fromEl.classList.remove('active');
        setTimeout(() => {
            fromEl.classList.add('hidden');
            toEl.classList.remove('hidden');
            setTimeout(() => {
                toEl.classList.add('active');
            }, 50);
        }, 400); 
    }
});
