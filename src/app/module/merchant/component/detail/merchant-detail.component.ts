import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as _ from 'underscore';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantService } from '../../service/merchant.service';
import { Data } from '../../../../../app/providers/data';
import { VerificationRequest } from '../../model/verificationRequest'
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { environment } from '../../../../../../src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var $: any;


@Component({
  selector: 'merchant-detail',
  templateUrl: './merchantDetail.html',
  styleUrls: ['./merchant-detail-component.css'],
  providers: []
})

export class MerchantDetailComponent implements OnInit {
  public isSuccess: boolean = false;
  public isError: boolean = false;
  public result: any;
  public stakeholderResult: any;
  public thumbnail1: any;
  public thumbnail2: any;
  public bDocument1:any;
  public pDocument1:any;
  public stakeDocument1:any;
  public stakeDocument2:any;
  public pDocument2:any
  public bDocument1Type:any;
  public bDocument2:any;
  public stakeholder:any;
  public stakeholderAddress:any;
  public stakeholderDocument:any;
  public businessData: any;
  public merchantEmail: string;
  public customerBusiness: any;
  public imageUrl:string;
  public pending = false;
  public country:string;
  public bAddresCountry:any;
  public gender:any;
  public nationality:any;
  public accType:any;
  public stackHoldersList: any;
  public holders: any;
  public stackHolderFirstName: any;
  public stackHolderLastName: any;
  public stackHolderFullName: any;
  public businessPartnersArray: any;
  public businessPartner : any 

  

  constructor(
    private merchantService: MerchantService,private formBuilder: FormBuilder,private data: Data,
    private route: ActivatedRoute,private router: Router,private ngxService: NgxUiLoaderService) {
    this.imageUrl = environment.API_URL;
    let request = this.data.storage;
    if (request == undefined || request == null) {
      this.router.navigate(['merchant','list']);
    } else {
      this.merchantEmail = request.email;
    }
    this.route.data.subscribe(response => {
      console.log("Contructor call");
      
      console.log(response);
      
      let res = response[0].merchantDetail;
      this.pending = response[0].pending;
      if (res.code == 'DAO_SUCCESS_00') {
 
        this.result = res.responseData.customer;
        this.customerBusiness = res.responseData.customer.customerBusiness[0];
        this.stakeholder=this.customerBusiness.stakeHolder;
        this.holders = this.customerBusiness.stakeHolder[0];
        this.stackHolderFullName = this.customerBusiness.stakeHolder[0].fullName;
        const nameParts = this.stackHolderFullName.split(' ');
        this.stackHolderFirstName = nameParts[0];
        this.stackHolderLastName = nameParts[1];
        console.log(this.stackHolderFirstName);
        console.log(this.stackHolderLastName);

        // array for get stackholders array
        if( this.customerBusiness && this.customerBusiness.stakeHolder) {
          const businessPartners = [];
          for (const holder of this.customerBusiness.stakeHolder) {
            const businessPartner = {
            designation: holder.designation,
            firstName: holder.fullName,
            lastName:  holder.fullName,
            mobileNo: holder.mobileNo,
            email: holder.email,
            partnershipShare: "20", // You can customize this value
            createdDate: this.result.createdDate,
            dateOfBirth: this.result.dateOfBirth,
            addressLine1: this.customerBusiness.address.line1,
            addressLine2: this.customerBusiness.address.line2,
            city: this.customerBusiness.address.city,
            postCode: this.customerBusiness.address.postalCode,
            country: {
              countryName: this.customerBusiness.address.country
            }
          };
        
          businessPartners.push(businessPartner);
        }
        this.businessPartnersArray = businessPartners
        
        } else {
          console.log("Error in data");
        }

        console.log("stackholder array", this.businessPartnersArray);
        let businessData = this.customerBusiness.address;
        let businessDoc = this.customerBusiness.documents;
        var customerDoc = this.result.customerDocumentVos;

        this.profileForm.patchValue({
          firstName: this.result.firstName,
          lastName: this.result.lastName,
          fullName: this.result.accountVo.fullName,
          dob: this.result.dateOfBirth,
          email: this.result.accountVo.email,
          mobileNo: this.result.accountVo.mobileNo,
          accType: this.result.accountVo.type,
          gender: this.result.gender,
          nationality: this.result.nationality
        });

        this.profileForm.disable();

        this.documentsForm.patchValue({
          // document1: customerDoc[0].document,
          // Add if case if passport
        //   document2: null
        })

        this.addressForm.patchValue({
          line1: this.result.customerAddressVo.line1,
          line2: this.result.customerAddressVo.line2,
          city: this.result.customerAddressVo.city,
          postalCode: this.result.customerAddressVo.postalCode,
          state: this.result.customerAddressVo.state,
          country: this.result.customerAddressVo.country
        });

        this.addressForm.disable();

        this.businessForm.patchValue({
          businessName: this.customerBusiness.fullName,
          registrationDate: this.customerBusiness.registrationDate,
          registrationNo: this.customerBusiness.registrationNo,
          taxNo: this.customerBusiness.taxNo,
          website: this.customerBusiness.website,
          businessStatus: this.customerBusiness.status
        })
        this.businessForm.disable();


        this.businessAddressForm.patchValue({
          bAddresLine1: businessData.line1,
          bAddresLine2: businessData.line2,
          bAddresCity: businessData.city,
          bAddresPostalCode: businessData.postalCode,
          bAddresState: businessData.state,
          bAddresCountry: businessData.country,
          // bDocument1: businessDoc[0].document,
          // bDocument2: businessDoc[1].document
        })

        this.businessAddressForm.disable();

        let obj=JSON.parse(JSON.stringify(customerDoc))
        this.thumbnail1=customerDoc[0].document;

        this.bDocument1=businessDoc[0].document;
        this.bDocument2=businessDoc[1].document;
        this.pDocument1=customerDoc[0].document;
        this.pDocument2=customerDoc[1].document;

        if(customerDoc.length>1){
          this.thumbnail2=customerDoc[1].document
        }

      } else {

      }
      setTimeout(() => {
        $('.tabs').tabs();
      }, 50);
    })
  }

  ngAfterViewInit() {
    console.log(this.stackHolderFirstName);
    console.log(this.stackHolderLastName);
    setTimeout(() => {
      $('.tabs').tabs();
      $("#dob").datepicker();
      $('.collapsible').collapsible({ accordion: true });
    }, 500);

    setTimeout(() => $('.modal.detail').modal({
      dismissible: false,
      endingTop: '25%'
    }), 50);
  }


  ngOnInit() {
    setTimeout(() => {
      $('select').formSelect();
    }, 50);
  }

  profileForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    fullName: [''],
    accType: [''],
    nationality: [''],
    gender: [''],
    dob: [''],
    mobileNo: [''],
    email: [''],
    status: ['']
  })
  get profile() { return this.profileForm.controls; }

  addressForm = this.formBuilder.group({
    line1: [''],
    line2: [''],
    city: [''],
    postalCode: [''],
    state: [''],
    country: ['']
  })
  get address() { return this.addressForm.controls; }


  StakeholderAddressForm = this.formBuilder.group({
    line1: [''],
    line2: [''],
    city: [''],
    postalCode: [''],
    state: [''],
    country: ['']
  })
 get StakeholderAddress() { return this.StakeholderAddressForm.controls; }
 
  documentsForm = this.formBuilder.group({
    document1: [''],
    document2: ['']
  })

  get document() { return this.documentsForm.controls; }

  StakeholderDocumentsForm = this.formBuilder.group({
    document1: [''],
    document2: ['']
  })
  get StakeholderDocument() { return this.StakeholderDocumentsForm.controls; }

  businessForm = this.formBuilder.group({
    businessName: [''],
    registrationDate: [''],
    registrationNo: [''],
    taxNo: [''],
    website: [''],
    businessStatus: ['']
  })

  get business() { return this.businessForm.controls; }
  businessAddressForm = this.formBuilder.group({
    bAddresLine1: [''],
    bAddresLine2: [''],
    bAddresCity: [''],
    bAddresPostalCode: [''],
    bAddresState: [''],
    bAddresCountry: [''],
    bDocument1: [''],
    bDocument2: ['']
  })

  get businessAddress() { return this.businessAddressForm.controls; }


  verifyMerchant(VerificationRequest) {
    this.merchantService.approveMerchants(VerificationRequest).subscribe((result) => {
      if (result != null && result.code === 'DAO_SUCCESS_00') {
          this.isSuccess = true;
          setTimeout(() => {
            this.router.navigate(['merchant', 'list']);
          }, 1500)
      }
      else{
        // this.isError = true;
      }
    }, error => {console.log(error)});

  }

  rejectMerchant() {
    let request= new VerificationRequest(this.result.account.email,"2",this.result.customerBusiness[0].id);
    this.verifyMerchant(request);
  }

  approveMerchant() {
    let request= new VerificationRequest(this.result.accountVo.email,"1",this.result.customerBusiness[0].id);
    this.verifyMerchant(request);
  }


  loadImages(request){
    this.merchantService.getImageData(null,null).subscribe((result) => {
      if (result.ok) {
        // console.log(result);
      return result.url
      }
      // else{
      //   // this.isError = true;
      // }
    }, error => {console.log(error)});
  }

  openModalAddress() {
    setTimeout(() => {
      $('#modalDetail').modal('open');
    }, 50);
  }

  openModalDocument() {
    setTimeout(() => {
      $('#modalDocument').modal('open');
    }, 50);
  }
  

  closeModal() {
    $('.modal.detail').modal('close');
    setTimeout(() => {
      $('select').formSelect();
    }, 50);
  }


  getStakeholderData(email) {
    this.ngxService.start();
    this.merchantService.getSelectedMerchant(email).subscribe((result)=> {
      if(result != null && result.responseData != null) {
        this.stackHoldersList = result.responseData.customer.customerBusiness[0].stakeHolder;
        let res = result.responseData.customer;
        this.stakeholderResult=res.firstName;
        this.stakeholderAddress=res.customerAddressVo;
        this.stakeholderDocument=res.customerDocumentVos;

        this.StakeholderAddressForm.patchValue({
          line1: this.stakeholderAddress.line1,
          line2: this.stakeholderAddress.line2,
          city: this.stakeholderAddress.city,
          postalCode: this.stakeholderAddress.postalCode,
          state: this.stakeholderAddress.state,
          country: this.stakeholderAddress.country
        });
        
        this.StakeholderAddressForm.disable();

        if(this.stakeholderDocument){
         this.stakeDocument1=this.stakeholderDocument[0].document;
         this.stakeDocument2=this.stakeholderDocument[1].document;
        }


        $('select').formSelect();

      this.ngxService.stop();
      }
      else{
        this.ngxService.stop();
      }
    }, error => {console.log(error);})

  }

  fetchAddress(data){
    this.getStakeholderData(data);
    this.openModalAddress();
  }

  openImageInNewTab(key) {

    let fileId,customerId;

    if(key == 'BD1'){
      fileId = this.bDocument1;
      customerId = this.customerBusiness.fullName;
    }
    else if(key == 'BD2'){
      fileId = this.bDocument2;
      customerId = this.customerBusiness.fullName;
    }
    else if(key == 'ID1'){
      fileId = this.pDocument1;
      customerId = this.result.firstName;
    }
    else if(key =='ID2'){
      fileId = this.pDocument2;
      customerId = this.result.firstName;
    }
    
    let url = this.imageUrl + "file/downloadFile?fileID=" + fileId + "&customerID=" + customerId ;
    let img = '<img src="' + url + '">';
    let w = window.open();
    w.document.write(img);

}
  fetchDocument(data){
    this.getStakeholderData(data);
    this.openModalDocument();
  }

  openModal(){}

  createCustomer() {
    let body = {
      userName:  this.result.accountVo.mobileNo,
      customer: {
          countryVo: {
              countryName: this.result.customerAddressVo.country
          },
          dateOfBirth: this.result.dateOfBirth,
          email: this.result.accountVo.email,
          expectedMonthlySpend: "1000",
          externalReference: "ref1234",
          homeAddress: this.result.customerAddressVo.line1,
          name: this.result.accountVo.fullName,
          postCode: this.result.customerAddressVo.postalCode,
          postTown: this.result.customerAddressVo.city,
          type: "BUSINESS"
      },
      business: {
          fullName: this.customerBusiness.fullName,
          registrationNo: this.customerBusiness.registrationNo,
          registrationDate: this.result.createdDate,
          taxNo: this.customerBusiness.taxNo,
          addressLine1: this.customerBusiness.address.line1,
          addressLine2: this.customerBusiness.address.line2,
          city: this.customerBusiness.address.city,
          postCode: this.customerBusiness.address.postalCode,
          country: {
              countryName: this.customerBusiness.address.country
          },
          website: this.customerBusiness.website,
          createdDate: this.result.createdDate,
          updatedDate: this.result.updatedDate,
          industry: {
              name : 'Technology' //this.customerBusiness.industry
          },
          registrationType:{
              type: 'Sole Proprietorship' //this.customerBusiness.registrationType
          } 
      },
      businessPartners: 
        this.businessPartnersArray
        
      }
      console.log("payload", body);
      
    // this.ngxService.start();
    // this.merchantService.createCustomer(body).subscribe((result)=> {
    //   console.log("API", result);
      
    //   if(result.code == 'SUCCESS_00' ) {
    //   this.approveMerchant();
    //   this.ngxService.stop();
    //   }
    //   else{
    //     this.ngxService.stop();
    //     console.log("Error in API");
        
    //   }
    // }, error => {console.log(error);})

  }

}
