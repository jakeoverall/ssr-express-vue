/**
 *******************************
 * DEFAULTS FOR ALL PAGES ONLY *
 *******************************
 */

module.exports = {
	cacheOptions: {
		max: 1,
		maxAge: 1
	},
	metas: [
		{ name: 'application-name', content: 'Name of my application' },
		{ name: 'description', content: 'A description of the page', id: 'desc' }, // id to replace intead of create element
		// ...
		// Twitter
		{ name: 'twitter:title', content: 'Content Title' },
		// ...
		// Facebook / Open Graph
		{ property: 'fb:app_id', content: '123456789' },
		{ property: 'og:title', content: 'Content Title' },
		// ...
		// Rel
		{ rel: 'icon', type: 'image/png', href: '/assets/favicons/favicon-32x32.png', sizes: '32x32' }
		// Generic rel for things like icons and stuff
	],
	structuredData: {
		"@context": "http://schema.org",
		"@type": "Organization",
		"url": "http://www.your-company-site.com",
		"contactPoint": [{
			"@type": "ContactPoint",
			"telephone": "+1-000-000-0000",
			"contactType": "customer service"
		}]
	}
}