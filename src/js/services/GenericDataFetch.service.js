import { HTTP } from 'services/Http';
import { APP_HOST } from 'constants/app-config';


export const getGenericDataFetch = ( { url, path, handlers, params } ) => {

    const config =  {
        url,
        host: APP_HOST,
        path: path,
        params: params,
        handlers: {
            onSuccess: handlers.success,
            onFailure: handlers.failure
        }
    };

     //console.log( config );
    
    return HTTP.get( config );
};


