import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Pushmark implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pushmark',
		name: 'pushmark',
		icon: 'file:pushmark.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["channelHash"]}}', // Arayüzde node'un altında hash değerinin bir kısmı görünür
		description: 'Send push notifications via Pushmark',
		defaults: {
			name: 'Pushmark',
		},
		inputs: ['main'],
		outputs: ['main'],
		// credentials özelliğini tamamen kaldırdık!
		properties: [
			{
				displayName: 'Channel Hash',
				name: 'channelHash',
				type: 'string',
				default: '',
				required: true,
				description: 'The unique hash value of the channel to which the notification will be sent',
			},
			{
				displayName: 'Message Type',
				name: 'messageType',
				type: 'options',
				options: [
					{ name: 'Info', value: 'info' },
					{ name: 'Warning', value: 'warning' },
					{ name: 'Error', value: 'error' },
					{ name: 'Success', value: 'success' },
					{ name: 'Log', value: 'log' },
				],
				default: '',
				required: true,
				description: 'Type of message to be sent (e.g., info, warning, error, success, log)',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				required: true,
				description: 'Content of the notification to be sent',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				// Kullanıcının n8n arayüzünde girdiği verileri alıyoruz
				const channelHash = this.getNodeParameter('channelHash', i) as string;
				const messageType = this.getNodeParameter('messageType', i) as string;
				const message = this.getNodeParameter('message', i) as string;

				// Pushmark API'sine gidecek isteğin yapısı
				const options = {
					method: 'POST' as 'POST', // TypeScript hatasını çözen sihirli eklenti
					uri: 'https://api.pushmark.app/' + channelHash,
					body: {
						message_type: messageType,
						message: message,
					},
					json: true,
				};

				// Artık requestWithAuthentication yerine doğrudan request kullanıyoruz
				const responseData = await this.helpers.request(options);

				returnData.push({ json: responseData });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}