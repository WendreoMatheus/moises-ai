import { Registry } from 'miragejs'
import { models } from './models'

type AppRegistry = Registry<typeof models>
export type AppSchema = Schema<AppRegistry>
