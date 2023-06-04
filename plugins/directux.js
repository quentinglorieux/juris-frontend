import { Directus } from '@directus/sdk';

export default defineNuxtPlugin(() => {

	const config = useRuntimeConfig();
	const directus = new Directus(config.public.API_BASE_URL);

	return {
		provide: { directus },
	};
});


