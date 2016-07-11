module Model {
    export class ELearningContent {
     
        Id: number;
        CreatedOn: string;
        UserId: number;
        Title: string;
        Description: string;
        ContentImage: string;
        ContentImageGuid: string;
      
        CreatedDateTime: any;
        CategoryList: string[];
        TagList: string[];
        TargetList: string[];
    }
} 