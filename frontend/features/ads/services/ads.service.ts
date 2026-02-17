import { api } from "@/shared/api/instance.api"


class AdsService {
	public async getApi() {
		const response = await api.get('api/reward')

		return response
	}
}

export const adsService = new AdsService()
