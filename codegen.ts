import { CodegenConfig } from '@graphql-codegen/cli'
import { CONFIG } from './app/config'
 
const config: CodegenConfig = {
  schema: CONFIG.API_URL, 
  documents: ['app/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './app/gql/': {
      preset: 'client'
    }
  }
}
 
export default config
