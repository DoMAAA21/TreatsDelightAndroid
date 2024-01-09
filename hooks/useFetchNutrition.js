import { useState } from 'react';
import axios from 'axios';
import { OPEN_AI_KEY } from '@env';

const useFetchNutritionFacts = ({ formik }, item) => {
    const [gptLoading, setGptLoading] = useState(false);
    const [gptError, setGptError] = useState(null);
    const [gptSuccess, setGptSuccess] = useState(false);

    const measurement = item === 'product' ? 'packet' : '100g';

    const fetchNutrition = async () => {
        try {
            setGptLoading(true);

            const itemName = formik.values.name;

            if (!itemName) {
                return setGptError('Please input name');
            }

            const result = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo-1106',
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant. Please provide only raw data dont provide measurements like kcal, grams etc' },
                        {
                            role: 'user',
                            content: `Can u give me the nutritional facts (calories, protein, carbs, fat, fiber, sugar, sodium) of ${itemName} per ${measurement} without the title, only (calories, protein, carbs, fat, fiber, sugar, sodium) in JSON Format with NO EXTRA INSTRUCTION/MESSAGE also don't provide measurements only raw data, if u cant find return message "error"`,
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${OPEN_AI_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const response = result.data.choices[0].message.content;
        
            try {
                const parsedNutrition = JSON.parse(response);
                if (
                    'calories' in parsedNutrition &&
                    'protein' in parsedNutrition &&
                    'carbs' in parsedNutrition &&
                    'fat' in parsedNutrition &&
                    'fiber' in parsedNutrition &&
                    'sugar' in parsedNutrition &&
                    'sodium' in parsedNutrition
                ) {
                    const nutritionKeys = ['calories', 'protein', 'carbs', 'fat', 'fiber', 'sugar', 'sodium'];
                    nutritionKeys.forEach((key) => {
                        formik.setFieldValue(key, String(parseFloat(parsedNutrition[key])));
                    });

                    setGptSuccess(true);
                } else {
                    setGptError('Failed to load nutrition. Manually input data or try again.');
                }
            } catch (jsonParseError) {
                setGptError('Failed to load nutrition. Manually input data or try again.');
            }
        } catch (error) {
            setGptError('Failed to load nutrition. Manually input data or try again.');
        } finally {
            setGptLoading(false);
        }
    };

    return { gptLoading, gptSuccess, gptError, fetchNutrition, setGptError, setGptSuccess };
};

export default useFetchNutritionFacts;
