import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../shared/constants';

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

            const result = await axios.post(`${BACKEND_URL}/api/v1/admin/product/fetch-nutrition`, {itemName: itemName, measurement: measurement});
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
