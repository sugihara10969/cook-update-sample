import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { IngredientState } from '../RecipeItem';
export type RecipeState = {
   id: string;
   name: string;
   memo?: string | null;
   images?: string[] | null;
   link?: string | null;
   created_at: Date;
   updated_at: Date;
   dairyInformation: Array<{
      id: string;
      memo?: string | null;
      images?: string[] | null;
      person: number; //何人分
      created_at: Date;
      updated_at: Date; //?
      ingredients: Array<{
         id: string;
         name: string;
         memo?: string;
         amount: number;
         nextAmount: number | null;
         unit: string;
         moderation: number; //加減
         default: boolean; //加減を変更したかどうか
         right: boolean; //単位が右か左か
      }>;
   }>;
};
const initialState: RecipeState[] = [
   {
      id: '09fb9d96-b742-4a04-8abd-69401f6e6499',
      name: 'ペペロンチーノ',
      memo: '1.にんにくを切る 2.オリーブオイルを入れる',
      link: '',
      images: [
         'data:image/jpeg;base64,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',
      ],
      created_at: new Date(),
      updated_at: new Date(),
      dairyInformation: [
         {
            id: 'bec7e382-824a-4e09-8c5b-64f3a1f6aa8d',
            memo: '少し辛い',
            images: [
               'data:image/jpeg;base64,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',
            ],
            created_at: new Date(),
            updated_at: new Date(),
            person: 1,
            ingredients: [
               {
                  id: '9a8f2571-726e-4380-8511-137daf9072fc',
                  name: '塩',
                  amount: 5,
                  unit: 'mg',
                  moderation: 1,
                  nextAmount: null,
                  default: false,
                  right: true,
               },
               {
                  id: 'fb339be0-e709-4b96-8055-61cb0d359849',
                  name: 'オリーブオイル',
                  amount: 1.5,
                  unit: '大さじ',
                  moderation: 1.25,
                  nextAmount: null,
                  default: true,
                  right: false,
               },
               {
                  id: 'cf45174d-6102-4522-851f-11ff252434ad',
                  name: 'オリーブオイル',
                  amount: 1.5,
                  unit: '大さじ',
                  moderation: 1.25,
                  nextAmount: null,
                  default: true,
                  right: false,
               },
            ],
         },
         {
            id: '70d528c0-0f45-4af8-93a8-2c6a2bfb0ffa',
            memo: '少し辛い',
            images: [
               'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSabVGTrjHZ5gu8tq8T7-YPWZ_CZaFXt5ePmQ&usqp=CAU',
               'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSabVGTrjHZ5gu8tq8T7-YPWZ_CZaFXt5ePmQ&usqp=CAU',
            ],
            created_at: new Date(),
            updated_at: new Date(),
            person: 1,
            ingredients: [
               {
                  id: '70d528c0-0f45-4af8-93a8-2c6a2bfb0ffa',
                  name: '塩',
                  amount: 5,
                  nextAmount: null,
                  unit: 'mg',
                  moderation: 1,
                  default: false,
                  right: true,
               },
               {
                  id: '70d528c0-0f45-4af8-93a8-2c6a2bfb0ffa',
                  name: 'オリーブオイル',
                  memo: 'いい感じ',
                  amount: 1.3,
                  nextAmount: null,
                  unit: '大さじ',
                  moderation: 1,
                  default: false,
                  right: false,
               },
            ],
         },
      ],
   },
   {
      id: 'f80f79ab-1911-49bc-bd46-8d0fde4e99f5',
      name: '親子丼',
      memo: '美味しい',
      created_at: new Date(),
      updated_at: new Date(),
      dairyInformation: [
         {
            id: '06c61785-2df4-4e8f-b76f-de8bd2dab824',
            memo: '少し辛い',
            created_at: new Date(),
            updated_at: new Date(),
            person: 1,
            ingredients: [
               {
                  id: '441f8116-4eee-49d2-9201-67b5ec81baed',
                  name: 'みりん',
                  amount: 5,
                  nextAmount: null,
                  unit: 'mg',
                  moderation: 1,
                  default: false,
                  right: true,
               },
               {
                  id: 'f80f79ab-1911-49bc-bd46-8d0fde4e99f5',
                  name: '醤油',
                  amount: 1.5,
                  nextAmount: null,
                  unit: '大さじ',
                  moderation: 1.25,
                  default: true,
                  right: false,
               },
            ],
         },
         {
            id: 'a2fa5644-33df-4102-8695-406c4aba95b2',
            memo: 'おいしい！',
            created_at: new Date(),
            updated_at: new Date(),
            person: 2,
            ingredients: [
               {
                  id: 'f1c9ae7f-b3ee-443e-87a0-bddc6e1b182b',
                  name: 'みりん',
                  amount: 5,
                  nextAmount: null,
                  unit: '小さじ',
                  moderation: 1,
                  default: true,
                  right: false,
               },
               {
                  id: '9d2cf0d3-29f2-4c91-b87f-226b5c9fe582',
                  name: '醤油',
                  amount: 1.5,
                  nextAmount: null,
                  unit: '大さじ',
                  moderation: 0.75,
                  default: false,
                  right: false,
               },
            ],
         },
      ],
   },
];

const recipesSlice = createSlice({
   name: 'recipes',
   initialState,
   reducers: {
      changeMemo(state, action: PayloadAction<string>) {
         state[0].memo = action.payload;
      },

      // createRecipe(
      //    state,
      //    action: PayloadAction<{ name: string; memo: string }>
      // ) {
      //    const newRecipe: RecipeState = {
      //       name: action.payload.name,
      //       memo: action.payload.memo,
      //       ingredients: [
      //          { name: 'みりん', amount: 2, unit: '大さじ', moderation: 1 },
      //       ],
      //    };
      //    state.push(newRecipe);
      // },
   },
});

export const { changeMemo } = recipesSlice.actions;
// export const { changeMemo, createRecipe } = recipesSlice.actions;

export default recipesSlice.reducer;
