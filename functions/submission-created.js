export const handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			body: JSON.stringify({ message: 'Method Not Allowed' }),
		}
	}

	try {
		const requestData = JSON.parse(event.body)
		console.log('🔍 Parsed form data:', requestData)

		// Extract the actual form data
		const data = requestData.payload?.data
		if (!data) {
			throw new Error('Form data is missing')
		}

		const payload = {
			'First Name': data.firstname,
			'Last Name': data.lastname,
			Email: data.email,
			Mobile: data.phone,
			CallTime: data.time,
			'Zip Code': data.zipcode,
			'Comments or Questions': data.comment_or_question,
			'Preferred Time to Call': data.time,
			'Lead Source': data.leadSource || 'Assure USA Hustle Ads',
		}

		if (data.gclid !== '') {
			payload['Gclid'] = data.gclid
		}

		console.log('🚀 Payload sent to Salesforce:', payload)

		const response = await fetch(
			'https://fun-site-4680.my.salesforce-sites.com/services/apexrest/CreateLeadAssure',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			}
		)

		const responseText = await response.text()
		let responseData
		try {
			responseData = JSON.parse(responseText)
		} catch {
			responseData = responseText
		}

		if (!response.ok) {
			throw new Error(`Salesforce Error: ${JSON.stringify(responseData)}`)
		}

		console.log('✅ Salesforce response:', responseData)
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Lead submitted successfully!',
				response: responseData,
			}),
		}
	} catch (error) {
		console.error('❌ Error submitting lead:', error.message)
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Error submitting lead',
				error: error.message,
			}),
		}
	}
}
