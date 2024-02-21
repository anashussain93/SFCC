# Custom Storefront

The repository has a base cartridge (`app_storefront_base`) provided by Commerce Cloud that is never directly customized or edited. Instead, 
Also on the top of it (`app_custom_storefront`) is added for customizing storefront.

# SFRA version

SFRA is 7.0.0

# Getting Started

1. Clone this repository.

2. Run `npm install` to install all of the local dependencies (SFRA has been tested with Node v16.16 and is recommended)

3. Run `npm run compile:js` from the command line that would compile all client-side JS files. Run `npm run compile:scss` and `npm run compile:fonts` that would do the same for css and fonts.

4. Create `dw.json` file in the root of the project. Providing a [WebDAV access key from BM](https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fadmin%2Fb2c_access_keys_for_business_manager.html) in the `password` field is optional, as you will be prompted if it is not provided.
```json
{
    "hostname": "your-sandbox-hostname.demandware.net",
    "username": "AM username like me.myself@company.com",
    "password": "your_webdav_access_key",
    "code-version": "version_to_upload_to"
}
```

5. Run `npm run uploadCartridge`. It will upload cartridges to the sandbox you specified in `dw.json` file.

6. Use https://github.com/SalesforceCommerceCloud/storefrontdata to zip and import site data on your sandbox.

7. Add the `app_custom_store:app_storefront_base` cartridge to your cartridge path in _Administration >  Sites >  Manage Sites > RefArch - Settings_ (Note: This should already be populated by the sample data in Step 6).

8. You should now be ready to navigate to and use your site.

# NPM scripts
Use the provided NPM scripts to compile and upload changes to your Sandbox.

## Compiling your application

* `npm run compile:scss` - Compiles all .scss files into CSS.
* `npm run compile:js` - Compiles all .js files and aggregates them.
* `npm run compile:fonts` - Copies all needed font files. Usually, this only has to be run once.

 If you are having an issue compiling scss files, try running 'npm rebuild node-sass' from within your local repo.

# Contact Us Assignment Details
 
1. Extend **ContactUs-Landing** controller in 'app_custom_storefront'
2. Include **contactUs.isml**
3. Added content asset in ISML for right-side content from BM, content asset id is `contact-us-test`
4. Created a new custom object ID `contact-us` to store data submitted by customers from the Contact Us form.
5. Added helper class to send information to random email which is also configurable under storefront configs in BM. 
       The current value of this configuration is `rkatyal@altayer.com`, you can validate using the sandbox link below.
6. Client-side JS and SCSS also extended to custom cartridge.
   
## Bot Protection -  Google reCaptcha V3

1. Added Google Recaptcha for bot protection as mentioned in the requirement.
2. Included reCaptcha script in `htmlHead.isml`
3. Client-side script integrated to collect **token** and send to server for request validation.
4. Created service and helper class to validate token.

## Test Sandbox Storefront URL:
Code version is only active till `26th Feb 2024` for testing purpose.
* URL: 
```

https://dev08-eu01-sunandsand.demandware.net/on/demandware.store/Sites-RefArch-Site/en_US/ContactUs-Landing         

```


