/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmFreemium?: Maybe<User>;
  createCategory?: Maybe<Category>;
  createCheckoutSession?: Maybe<Scalars['String']['output']>;
  createPortalSession?: Maybe<Scalars['String']['output']>;
  createStrain?: Maybe<Strain>;
  registerUser: Scalars['String']['output'];
  updateStrainById?: Maybe<Strain>;
};


export type MutationCreateCategoryArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateCheckoutSessionArgs = {
  priceId: Scalars['String']['input'];
};


export type MutationCreateStrainArgs = {
  additionalParentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  femaleParentId?: InputMaybe<Scalars['String']['input']>;
  maleParentId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateStrainByIdArgs = {
  additionalParentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  femaleParentId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  maleParentId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  authenticate?: Maybe<Scalars['String']['output']>;
  currentUser?: Maybe<User>;
  getCategories?: Maybe<Array<Maybe<Category>>>;
  getStrainById?: Maybe<Strain>;
  getStrains?: Maybe<Array<Maybe<Strain>>>;
};


export type QueryGetStrainByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetStrainsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export type Strain = {
  __typename?: 'Strain';
  additionalParents?: Maybe<Array<Maybe<Strain>>>;
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  femaleParent?: Maybe<Strain>;
  femaleParentId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  links?: Maybe<Scalars['JSON']['output']>;
  maleParent?: Maybe<Strain>;
  maleParentId?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};
