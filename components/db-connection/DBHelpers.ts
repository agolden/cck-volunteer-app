export interface RecordIdentifier {
	id?: number;
	id_ref?: string;
}

/**
 * Builds a where clause using the database record id, if available,
 * and unique reference string otherwise
 *  
 * @returns A tuple containing the field name and value, for inclusion in the database query
 * @throws An error if neither the object id nor its unique reference is provided.
 */
export function getReference(org: RecordIdentifier): [string, string | number] {
	const fieldName = org.id ? "id" : "id_ref";
	const fieldValue = org.id ? org.id : org.id_ref;

	if (!fieldName || !fieldValue) {
		throw new Error('The object ID or ref must be provided');
	}

	return [fieldName, fieldValue];
}

/**
 * Sets the database URL environment variable so that prisma knows how to connect to the database
 */
export function setDatabaseUrl() {
	process.env.DATABASE_URL = `mysql://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}?schema=public`;

	const awsdec = Buffer.from(awsPem, 'base64').toString('utf8').replace(/\\n/g, "\n");
	if (process.env.NO_DB_SSL !== "true" && process.env.DB_HOST.includes('aws.com')) {
		process.env.DATABASE_URL += `&sslaccept=strict&sslcert=${encodeURIComponent(awsdec)}`;
	}
}

export const awsPem = "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlFQmpDQ0F1NmdBd0lCQWdJSkFNYzBaemFTVUs1MU1BMEdDU3FHU0liM0RRRUJDd1VBTUlHUE1Rc3dDUVlEXG5WUVFHRXdKVlV6RVFNQTRHQTFVRUJ3d0hVMlZoZEhSc1pURVRNQkVHQTFVRUNBd0tWMkZ6YUdsdVozUnZiakVpXG5NQ0FHQTFVRUNnd1pRVzFoZW05dUlGZGxZaUJUWlhKMmFXTmxjeXdnU1c1akxqRVRNQkVHQTFVRUN3d0tRVzFoXG5lbTl1SUZKRVV6RWdNQjRHQTFVRUF3d1hRVzFoZW05dUlGSkVVeUJTYjI5MElESXdNVGtnUTBFd0hoY05NVGt3XG5PREl5TVRjd09EVXdXaGNOTWpRd09ESXlNVGN3T0RVd1dqQ0JqekVMTUFrR0ExVUVCaE1DVlZNeEVEQU9CZ05WXG5CQWNNQjFObFlYUjBiR1V4RXpBUkJnTlZCQWdNQ2xkaGMyaHBibWQwYjI0eElqQWdCZ05WQkFvTUdVRnRZWHB2XG5iaUJYWldJZ1UyVnlkbWxqWlhNc0lFbHVZeTR4RXpBUkJnTlZCQXNNQ2tGdFlYcHZiaUJTUkZNeElEQWVCZ05WXG5CQU1NRjBGdFlYcHZiaUJTUkZNZ1VtOXZkQ0F5TURFNUlFTkJNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DXG5BUThBTUlJQkNnS0NBUUVBclhuRi9FNi9RaCtrdTNoUVRTS1BNaFFRbENwb1d2bkl0aHpYNk1LM3A1YTBlWEtaXG5vV0lqWWNOTkc2VXdKanA0ZlVYbDZnbHA1M0pvYm4rdFdOWDg4ZE5IMm44RFZicHBTd1NjVkUyTHB1TCs5NHZZXG4wRVlFL1h4TjdzdktlYThZdmxycWtVQkt5eEx4VGpoK1UvS3JHT2FIeHo5djBsNlpObERidWFadzNxSVdkRC9JXG42YU5iR2VSVVZ0cE02UCtiV0lveFZsL2NhUXlsUVM2Q0VZVWsrQ3BWeUpTa29wd0pselhUMDd0TW9ETDVXZ1g5XG5PMDhLVmdETno5cVAvSUd0QWNSZHVSY05pb0gzRTl2OTgxUU8xenQvR3BiMmY4TnFBalVVQ1Vaek9uaWo2bXg5XG5NY1orOWNXWDg4Q1J6UjB2UU9EV3Vac2NnSTA4TnZNNjlGbjJTUUlEQVFBQm8yTXdZVEFPQmdOVkhROEJBZjhFXG5CQU1DQVFZd0R3WURWUjBUQVFIL0JBVXdBd0VCL3pBZEJnTlZIUTRFRmdRVWMxOWcyTHpMQTVqMEt4YzBMalphXG5wbUQvdkI4d0h3WURWUjBqQkJnd0ZvQVVjMTlnMkx6TEE1ajBLeGMwTGpaYXBtRC92Qjh3RFFZSktvWklodmNOXG5BUUVMQlFBRGdnRUJBSEFHN1dUbXlqelBSSU04NXJWaitmV0hzTEl2cXB3NkRPYklqTVdva3BsaUNlTUlOWkZWXG55bmZnQktzZjFFeHdidkpOellGWFc2ZGlobmd1REc5Vk1QcGkydXAvY3RRVE44dG05bkRLT3kwOHVOWm9vZk1jXG5OVVp4S0NFa1ZLWnYrSUw0b0hvZWF5dDhlZ3R2M3VqSk02VjE0QXN0TVE2U3d2d3ZBOTNFUC9VZzJlNFdBWEh1XG5jYkkxTkFiVWdWRHFwK0RSZGZ2WmtnWUtyeWpUV2QvMCsxZlM4WDFiQlpWV3psN2Vpck5WbkhiU0gyWkRwTnVZXG4wU0JkOGRqNUY2bGQzdDU4eWRaYnJUSHplN0pKT2Q4aWp5U0FwNC9raXU5VWZaV3VUUEFCekRhL0RTZHo5RGsvXG56UFc0Q1hYdmhMbUUwMlRBOS9IZUN3M0tFSEl3aWNOdUVmdz1cbi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS1cbi0tLS0tQkVHSU4gQ0VSVElGSUNBVEUtLS0tLVxuTUlJRUJ6Q0NBdStnQXdJQkFnSUNaSUV3RFFZSktvWklodmNOQVFFTEJRQXdnWTh4Q3pBSkJnTlZCQVlUQWxWVFxuTVJBd0RnWURWUVFIREFkVFpXRjBkR3hsTVJNd0VRWURWUVFJREFwWFlYTm9hVzVuZEc5dU1TSXdJQVlEVlFRS1xuREJsQmJXRjZiMjRnVjJWaUlGTmxjblpwWTJWekxDQkpibU11TVJNd0VRWURWUVFMREFwQmJXRjZiMjRnVWtSVFxuTVNBd0hnWURWUVFEREJkQmJXRjZiMjRnVWtSVElGSnZiM1FnTWpBeE9TQkRRVEFlRncweE9UQTVNVEl5TVRNeVxuTXpKYUZ3MHlOREE0TWpJeE56QTROVEJhTUlHVU1Rc3dDUVlEVlFRR0V3SlZVekVUTUJFR0ExVUVDQXdLVjJGelxuYUdsdVozUnZiakVRTUE0R0ExVUVCd3dIVTJWaGRIUnNaVEVpTUNBR0ExVUVDZ3daUVcxaGVtOXVJRmRsWWlCVFxuWlhKMmFXTmxjeXdnU1c1akxqRVRNQkVHQTFVRUN3d0tRVzFoZW05dUlGSkVVekVsTUNNR0ExVUVBd3djUVcxaFxuZW05dUlGSkVVeUJsZFMxM1pYTjBMVElnTWpBeE9TQkRRVENDQVNJd0RRWUpLb1pJaHZjTkFRRUJCUUFEZ2dFUFxuQURDQ0FRb0NnZ0VCQUxHaXdxamlGN3hJalQwU3g3ekIzNzY0SzJUMmExREhuQXhFT3IrL0VJZnRXS3hXelQzdVxuUEZ3UzJlRVpjbktxU2RSUSt2UnpvbkxCZU5MTzR6OGFMalFuTmJraXpaTUJ1WEdtNEJxUm0xS2dxM25sTERRblxuN1lxZGlqT3E1NFNwU2h2Ui84enNPNHNnTURNbUhJWUFKSk9KcUJkYXVzMnNtUnQwTm9iSUtjMGxpeTc3NTlLQlxuNmttUTQ3R2cra2ZJd3hyUUE1emx2UExlUUlteFNvUGk5TGRiUm9LdnU3SW90N1NPYStqR2hWQmgzVmRxbmRKWFxuN3RtL3NhajRORTM3NWNzbU1FVEZMQU9YamF0N3pWaU1Sd1Zvclg0VjZBekVnMXZrenhYcEE5TjdxeXdXSVQ1WVxuZllhcTVNOGk2dnZMZzBDenJIOWZIT1J0bmtkamR1MXkrME1DQXdFQUFhTm1NR1F3RGdZRFZSMFBBUUgvQkFRRFxuQWdFR01CSUdBMVVkRXdFQi93UUlNQVlCQWY4Q0FRQXdIUVlEVlIwT0JCWUVGRk9oT3gxeXQzWjdtdkdCOWpCdlxuMnltZFp3aU9NQjhHQTFVZEl3UVlNQmFBRkhOZllOaTh5d09ZOUNzWE5DNDJXcVpnLzd3Zk1BMEdDU3FHU0liM1xuRFFFQkN3VUFBNElCQVFCZWhxWTM2VUdEdlBWVTkrdnRhWUdyMzhkQmJwK0x6a2paekh3S1QxWEpTU1VjMndxTVxuaG5DSVFLaWxvbnJUSXZQMXZta1FpOHFIUHZEUnRCWktxdnovQUVyVy9ad1FkWnpxWU5GZCtCbU9YYWVaV1YwUVxub0h0RHpYbWN3dFA4YVVRcHhOMGUxeGtXYjFFODBxb3krMHV1UnFiLzUwYi9SNFE1cXFTZkpoa242ejhud0IxMFxuN1JqTHRKUHJLOGlneGRwcjN0R1V6ZkFPeWlQcklEbmNZN1VKYUw4NEdGcDdXV0FrSDBXRzNIOFk4RFJjUlhPVVxubXFEeERMVVAzck51b3czam5HeGlVWStnR1g1T3FhWmc0ZjRQNlF6T1NtZVFZczZuTHBIMFBpTjAwK29TMUJiRFxuYnBXZFpFdHRJTFBJK3ZBWWtVNFF1QktLRGpKTDZIYlNkK2NuXG4tLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tXG4tLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cbk1JSUNyakNDQWpTZ0F3SUJBZ0lSQUtLUFRZS2xuOUw0TlR4OWRwWkdVam93Q2dZSUtvWkl6ajBFQXdNd2daWXhcbkN6QUpCZ05WQkFZVEFsVlRNU0l3SUFZRFZRUUtEQmxCYldGNmIyNGdWMlZpSUZObGNuWnBZMlZ6TENCSmJtTXVcbk1STXdFUVlEVlFRTERBcEJiV0Y2YjI0Z1VrUlRNUXN3Q1FZRFZRUUlEQUpYUVRFdk1DMEdBMVVFQXd3bVFXMWhcbmVtOXVJRkpFVXlCbGRTMTNaWE4wTFRJZ1VtOXZkQ0JEUVNCRlEwTXpPRFFnUnpFeEVEQU9CZ05WQkFjTUIxTmxcbllYUjBiR1V3SUJjTk1qRXdOVEl4TWpJMU5USXhXaGdQTWpFeU1UQTFNakV5TXpVMU1qRmFNSUdXTVFzd0NRWURcblZRUUdFd0pWVXpFaU1DQUdBMVVFQ2d3WlFXMWhlbTl1SUZkbFlpQlRaWEoyYVdObGN5d2dTVzVqTGpFVE1CRUdcbkExVUVDd3dLUVcxaGVtOXVJRkpFVXpFTE1Ba0dBMVVFQ0F3Q1YwRXhMekF0QmdOVkJBTU1Ka0Z0WVhwdmJpQlNcblJGTWdaWFV0ZDJWemRDMHlJRkp2YjNRZ1EwRWdSVU5ETXpnMElFY3hNUkF3RGdZRFZRUUhEQWRUWldGMGRHeGxcbk1IWXdFQVlIS29aSXpqMENBUVlGSzRFRUFDSURZZ0FFL293VFJlRHZhUnFkbWJ0VHpYYnlSbUVwS0NFVE5qNk9cbmhaTUtIMEY4b1U5VG1uOFJVN2tRUWo2eFVLRXlqTFByRkJON2MrMjZUdnJWTzFLbUpBdmJjOGJWbGlpSlpNYmNcbkMweVY1UHRKVGFsdmxNWkExTm5jaVp1aHhheHJ6bEsxbzBJd1FEQVBCZ05WSFJNQkFmOEVCVEFEQVFIL01CMEdcbkExVWREZ1FXQkJUNGk1SGFvSHRyczdNaThhdUxoTWJLTTFYZXZEQU9CZ05WSFE4QkFmOEVCQU1DQVlZd0NnWUlcbktvWkl6ajBFQXdNRGFBQXdaUUl4QUs5QSs4L2xGZFg0WEpLZ2ZQK1pMeTV5U1hDMkUwU3BveTEyR3YyR2RVRVpcbnAxRzdjMUtiV1ZseWIxZDZzdWJ6a1FJd0t5SDBOYWYvM3VzV2ZmdGttcThTemFnaWNLejVjR2NFVWFVTHE0dE9cbkd6QS9BTXByNjNJREJBcWtaYk1EVENtSFxuLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLVxuLS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlGL3pDQ0ErZWdBd0lCQWdJUkFNRGsvRitycmhkbjQyU2ZFK2doUEM4d0RRWUpLb1pJaHZjTkFRRU1CUUF3XG5nWmN4Q3pBSkJnTlZCQVlUQWxWVE1TSXdJQVlEVlFRS0RCbEJiV0Y2YjI0Z1YyVmlJRk5sY25acFkyVnpMQ0JKXG5ibU11TVJNd0VRWURWUVFMREFwQmJXRjZiMjRnVWtSVE1Rc3dDUVlEVlFRSURBSlhRVEV3TUM0R0ExVUVBd3duXG5RVzFoZW05dUlGSkVVeUJsZFMxM1pYTjBMVElnVW05dmRDQkRRU0JTVTBFME1EazJJRWN4TVJBd0RnWURWUVFIXG5EQWRUWldGMGRHeGxNQ0FYRFRJeE1EVXlNVEl5TlRFeU1sb1lEekl4TWpFd05USXhNak0xTVRJeVdqQ0JsekVMXG5NQWtHQTFVRUJoTUNWVk14SWpBZ0JnTlZCQW9NR1VGdFlYcHZiaUJYWldJZ1UyVnlkbWxqWlhNc0lFbHVZeTR4XG5FekFSQmdOVkJBc01Da0Z0WVhwdmJpQlNSRk14Q3pBSkJnTlZCQWdNQWxkQk1UQXdMZ1lEVlFRRERDZEJiV0Y2XG5iMjRnVWtSVElHVjFMWGRsYzNRdE1pQlNiMjkwSUVOQklGSlRRVFF3T1RZZ1J6RXhFREFPQmdOVkJBY01CMU5sXG5ZWFIwYkdVd2dnSWlNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0SUNEd0F3Z2dJS0FvSUNBUUMydHdNQUxWZzl2UlZ1XG5WTnFzcjZOOHRobXAzRHk4akVHVHNtM0dDUStDNVAyWWNHbEQvVC81aWNmV1c4NHVGN1N4M2V6Y0dsdnNxRk1mXG5Va2o5c1F5cXR6N3FmRkZ1Z3l5N3BhL2VIOWY0OGtXRkhMYlFZbTlHRWdiWUJJcldNcDFjeTN2eXh1TUN3UU40XG5EQ25jcVUreU5weTBDcHJRSkVoYTNQelkrM3lKT2pEUXRjM3pyOTlseUVDQ0ZKVERVdWN4SHp5UXZYODllTDc0XG51aDhsYTBsS0gzdjl3UHBuRW9mdGJyd21tNWpITkZkemo3dVhVSFVKNDFON2FmN3o3UVVmZ2hJUmhsQkRpS3R4XG41bFlaZW1QQ1hhalRjM3J5REtVWkMvYitCNlZpWFptQWVNZG1Rb1BFMGp3eUVwL3VhVWNkcCtGbFVRd0Nmc0JrXG5heVBGRUFwVFdnUGlrdTJpc2pkZVRWbUVnTDhiSlREVVo2RllGUjdaSGNZQXNEemN3SGdJdTNHR0VNVlJTM1VmXG5JTG1pb2l5bHk5dmNLNFNhMDFvbmRBUm1zaS9JMHM3cFdwS2ZsYWVreXY1Ym9KS0QveHF3ejlsR2VqbUpIZWxmXG44T2QyVHlxSlNjTXBCN1E4YzJST3hCd3F3Qjcyak1DRXZZaWdCK1duYmI4UmlwbGlxTmZsSUd4OTM4RlJDektMXG5VUVVCbU5Bem5SL3lSUkwwd0hmOVVBRS84djlhMDl1WkFCZWl6bnpPRkFsL2ZySHBnZEFiQzAwTGtGbG53d2dYXG5nOFlmRUZsa3A0Zkx4NUI3THRvTzZ1Vk5GVmltTHh0d2lycHlLb2ozRzRNL2t2U1R1eDhiVHcwaGVCQ21XbUtSXG41N01TNms3T0R6YnYrS3BlaHQyaHFWWkNORk14b1FJREFRQUJvMEl3UURBUEJnTlZIUk1CQWY4RUJUQURBUUgvXG5NQjBHQTFVZERnUVdCQlJ1TW5EaEpqb2o3RGNLQUxqK0hieEVxajNyNmpBT0JnTlZIUThCQWY4RUJBTUNBWVl3XG5EUVlKS29aSWh2Y05BUUVNQlFBRGdnSUJBTFNuWGZ4NzJDM2xkaEJQNWtZNE1vMkREYUdROEZHcFRPT2lEOTVkXG4wcmY3STlMcnNCR1ZxdS9OaXIra3FxUDgwUEI3MCtKeTlmSEZGaWdYd2NQQlgzTXBLR3hLOENlbDdrVmY4dDFCXG40WUQ2QTZicWx6UCtPVUwwdUdXZlpwZHBEeHdNREkyRmx0NE5FbGRIZ1hXUGp2TjFWYmxFS3MwK2tQbktvd3lnXG5qaFJNZ0JiRC95Kzh5ZzBmSWNqWFVEVEF3LytJTmNwMjFnV2FNdWtLUXIvOEhzd3FDMXlvcVc5aW4yaWpRa3BLXG4yUkI5dmNRMC9nWFIwb0pVYlpReDBqbjBPSDhBZ3Q3eWZNQW5KQWRuSE80TTNnanZsSkx6SUM1LzRhR3JSWFpsXG5Kb1pLZkoyZlpSbnJGTWkwbmhBWURlSW5vUytSd3grUXphQms2Zlg1VlB5Q2o4Zm9aMG5tcXZ1WW95ZHpEOFc1XG5tTWx5Y2d4RnFTK0RVbU8rbGlXbGxRQzQvTW5WQmxIR0IxQ3Uzd1RqNWtnT3ZOcy9rK0ZXM0dYR3pEMytycHYwXG5RVEx1d1NiTXIrTWJFVGh4clNaUlNYVENRektmZWh5QytXWmVqZ0xiKzh5bExKVUExMGU2Mm83SDlQdkNyd2orXG5aRFZtTjdxajZhbXp2bmRDUDk4c1pmWDdDRlpQTGZjQmQ0d1ZJakhzRmpTTkV3V0hPaUZ5TFBQRzdjZG9sR0tBXG5sT0Z2b252bzRBMXVSYzEzL3pGZVAwWGk1bjVPWjJnbzhhT09lR1lkSTJ2QjJzZ0g5UjJJQVNIL2pIbXIwZ3ZZXG4wZGZCQ2NmWE5nclMwdG9xMExYL3krNUtrS094aDUydkVZc0pMZGhxcnZldVpoUW5zRkVtL21Gd2pSWGt5TzdjXG4yanBDXG4tLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tXG4tLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cbk1JSUQvakNDQXVhZ0F3SUJBZ0lRVERjK1VnVFJ0WU83WkdUUThVV0tEREFOQmdrcWhraUc5dzBCQVFzRkFEQ0Jcbmx6RUxNQWtHQTFVRUJoTUNWVk14SWpBZ0JnTlZCQW9NR1VGdFlYcHZiaUJYWldJZ1UyVnlkbWxqWlhNc0lFbHVcbll5NHhFekFSQmdOVkJBc01Da0Z0WVhwdmJpQlNSRk14Q3pBSkJnTlZCQWdNQWxkQk1UQXdMZ1lEVlFRRERDZEJcbmJXRjZiMjRnVWtSVElHVjFMWGRsYzNRdE1pQlNiMjkwSUVOQklGSlRRVEl3TkRnZ1J6RXhFREFPQmdOVkJBY01cbkIxTmxZWFIwYkdVd0lCY05NakV3TlRJeE1qSTBOakkwV2hnUE1qQTJNVEExTWpFeU16UTJNalJhTUlHWE1Rc3dcbkNRWURWUVFHRXdKVlV6RWlNQ0FHQTFVRUNnd1pRVzFoZW05dUlGZGxZaUJUWlhKMmFXTmxjeXdnU1c1akxqRVRcbk1CRUdBMVVFQ3d3S1FXMWhlbTl1SUZKRVV6RUxNQWtHQTFVRUNBd0NWMEV4TURBdUJnTlZCQU1NSjBGdFlYcHZcbmJpQlNSRk1nWlhVdGQyVnpkQzB5SUZKdmIzUWdRMEVnVWxOQk1qQTBPQ0JITVRFUU1BNEdBMVVFQnd3SFUyVmhcbmRIUnNaVENDQVNJd0RRWUpLb1pJaHZjTkFRRUJCUUFEZ2dFUEFEQ0NBUW9DZ2dFQkFNMW9HdHRoUTFZaVZJQzJcbmk0dTRzd01BR3hBamMvQlpwMHlxMGVQNVpRRmF4bnhzN3pGQVBhYkVXc3JqZUR6clJoZFZPMGg3enNrcmVydFBcbmdibEdoZkQyMEpmanZDSGRQMVJVaHkvbnpHK1QraG42VGFrYW4vR0lnczhncmxCTVJITWdCWUhXN3RrbGhqYUhcbjNGN0x1amhjZUFIaGhncDZJT3JwYjZZVGFUVGFKYkYzR1Rta3F4U0ozbDFMdEVvV3o4QWwvbkwvRnR6eHJ0ZXpcblZzNmVicHZkN3N3MzdzeG1YQldYMk9sdlVyUENUbWxhZHc5T3JsbEdYdENGdzRZeUxlM3pvekJsWjNjSHpRMHFcbmxJTmhwUmNhalRNZlpyc2lHQ2tRdG9KVCtBcVZKUFMyc0hqcXNFSDh5aXlTVzlKYnE0enlNYk0xeXFRMnZubnhcbk1KZ29ZTWNDQXdFQUFhTkNNRUF3RHdZRFZSMFRBUUgvQkFVd0F3RUIvekFkQmdOVkhRNEVGZ1FVYVFHODhVblZcbkpQVEkrUGN0aTFQK3EzSDdwR1l3RGdZRFZSMFBBUUgvQkFRREFnR0dNQTBHQ1NxR1NJYjNEUUVCQ3dVQUE0SUJcbkFRQkFrZ3I3NVYwc0VKaW1DNlFSaVRWV0V1ajJLaHk3dW5qU2Z1ZGJNNnp1bWhYRVUyL3NVYVZMaVl5NmNBL3hcbjN2MGxhRGxlNlQwN3g5ZzY0ajVZYXN0RS80amJ6ckdnSUlORmxZMEpuYVltUjNLWkVqZ2kxczFma1JSZjNsbExcblBKbTl1NFExbWJ3QU1RSy9aakx1dVJjTDN1UklISmVrMThuUnFUNWg0M0dCMjZxWHl2SnFlWVlwWWZJakw5Ky9cbllpWkFiU1JSWkcrTGkyM2NtUFdyYkExQ0pZMTIxU0IrV3liQ2J5c2JPWHpoRDNTbDJLU1pSd1N3NHAySHJGdFZcbjFQcmswZE9CdFp4Q0c5bHVmODd1bHR1RFpwZlMwdzZvTkJBTVhvY2dzd2syNHlsY0FEa2tGeEJXVys3QkVUbjFcbkVwSyt0MUxtMzdtVTRzeHR1aGEwMFhBaVxuLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=";