export interface profileAffiliate {
    affiliate: Affiliate;
}
export interface Affiliate {
    insurances:          string[];
    officePhone:         string[];
    enabled:             boolean;
    active:              boolean;
    approved:            boolean;
    degree:              Degree[];
    certificateCollege:  any[];
    currency:            string;
    timezone:            string;
    isTopDokto:          boolean;
    appointmentsFromApp: boolean;
    rating:              number;
    feedbackCount:       number;
    maxOverbooking:      number;
    commission:          number;
    _id:                 string;
    firstName:           string;
    lastName:            string;
    fullName:            string;
    email:               string;
    name:                string;
    vid:                 number;
    affiliateType:       string;
    country:             string;
    attachments:         any[];
    createdAt:           Date;
    updatedAt:           Date;
    __v:                 number;
    address:             string;
    cellPhone:           string;
    gender:              string;
    identification:      string;
    rtn:                 string;
    specialty:           string;
    yearsExperience:     null;
    etag:                string;
    image:               string;
    attentionSchedules:  AttentionSchedule[];
    id:                  string;
    groupedServices:     GroupedServices;
}

export interface AttentionSchedule {
    room:      string;
    floor?:    number;
    schedules: Schedule[];
    place:     AttentionSchedulePlace;
}

export interface AttentionSchedulePlace {
    loc:     LOC;
    _id:     string;
    name:    string;
    address: string;
}

export interface LOC {
    type:        string;
    coordinates: number[];
}

export interface Schedule {
    days:           string[];
    _id:            string;
    initialTimeStr: string;
    finalTimeStr:   string;
    initialTime:    Date;
    finalTime:      Date;
}

export interface Degree {
    fieldname:    string;
    originalname: string;
    encoding:     string;
    mimetype:     string;
    size:         string;
    filename:     string;
    uuid:         string;
    name:         string;
    bucket:       string;
}

export interface GroupedServices {
    virtual: Clinic[];
    atHome:  AtHome[];
    clinic:  Clinic[];
}

export interface Clinic {
    category:            Category[];
    subCategory:         any[];
    appointmentRequired: boolean;
    enabled:             boolean;
    _id:                 string;
    affiliate:           string;
    officePhone:         string;
    place:               ClinicPlace;
    room:                string;
    floor?:              number;
    service:             Service;
    price:               number;
    createdAt:           Date;
    updatedAt:           Date;
    __v:                 number;
}

export interface AtHome {
    category:            Category[];
    subCategory:         any[];
    appointmentRequired: boolean;
    enabled:             boolean;
    _id:                 string;
    affiliate:           string;
    officePhone:         string;
    place:               AtHomePlace;
    room:                string;
    floor:               null;
    service:             Service;
    price:               number;
    createdAt:           Date;
    updatedAt:           Date;
    __v:                 number;
}

export interface Category {
    active:      boolean;
    enabled:     boolean;
    service:     string[];
    menu:        string[];
    _id:         string;
    name:        Description;
    description: Description;
    updatedBy:   string;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
}

export interface Description {
    en: string;
    es: string;
}


export interface AtHomePlace {
    loc:         LOC;
    enabled:     boolean;
    virtual:     boolean;
    _id:         string;
    country:     string;
    countryName: string;
    city:        string;
    name:        string;
    createdBy:   string;
    address:     string;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
}

export interface ClinicPlace {
    loc:         LOC;
    enabled:     boolean;
    virtual:     boolean;
    _id:         string;
    country:     string;
    countryName: string;
    city:        string;
    name:        string;
    createdBy:   string;
    address:     string;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
}

export interface Service {
    active:            boolean;
    enabled:           boolean;
    affiliateType:     string[];
    isAppointment:     boolean;
    showIsAppointment: boolean;
    isVirtual:         boolean;
    isDomicilio:       boolean;
    isClinica:         boolean;
    _id:               string;
    name:              Description;
    description:       Description;
    createdAt:         Date;
    updatedAt:         Date;
    __v:               number;
}
