export interface IEvent {
  id?: number | string;
  eventFequency: string;
  balanceRequired: string;
  eventDate: string;
  eventDescription: string;
  eventEndTime: string;
  eventId: number;
  eventName: string;
  eventPhoto: string;
  eventstartTime: string;
  eventDateCreated: string;
  network?: number;
  tokenDecimal?: number;
  tokenIcon?: string;
  tokenName?: string;
  tokenSymbol?: string;
  tokenType?: string;
  tokenAddress?: string;
  venueName?: string;
  valueName?: string;
  balanceFrequency?: string | number;
}

export interface IVenue {
  id?: number | string;
  venueName: string;
  venueAddress: string;
  venueGmap: string;
  venuedataCreated?: string;
}
