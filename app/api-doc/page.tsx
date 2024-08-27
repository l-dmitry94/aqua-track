import dynamic from 'next/dynamic';

import swaggerDocumention from '../../public/swagger.json';

import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react').then((mod) => mod.default), {
    ssr: false,
});

export default function ApiDoc() {
    return (
        <div>
            <SwaggerUI spec={swaggerDocumention} />
        </div>
    );
}
