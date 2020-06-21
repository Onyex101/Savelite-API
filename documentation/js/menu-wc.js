'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">savelite-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-c31e502edac7847ce6416cf9c857c971"' : 'data-target="#xs-controllers-links-module-AppModule-c31e502edac7847ce6416cf9c857c971"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-c31e502edac7847ce6416cf9c857c971"' :
                                            'id="xs-controllers-links-module-AppModule-c31e502edac7847ce6416cf9c857c971"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-c31e502edac7847ce6416cf9c857c971"' : 'data-target="#xs-injectables-links-module-AppModule-c31e502edac7847ce6416cf9c857c971"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c31e502edac7847ce6416cf9c857c971"' :
                                        'id="xs-injectables-links-module-AppModule-c31e502edac7847ce6416cf9c857c971"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-0ddf34089b4d4bdc0bf600fa4f34bf8f"' : 'data-target="#xs-injectables-links-module-AuthModule-0ddf34089b4d4bdc0bf600fa4f34bf8f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0ddf34089b4d4bdc0bf600fa4f34bf8f"' :
                                        'id="xs-injectables-links-module-AuthModule-0ddf34089b4d4bdc0bf600fa4f34bf8f"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ValidateService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ValidateService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link">EmailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-EmailModule-66c0acc54bdc9097486b5f36027c4e77"' : 'data-target="#xs-controllers-links-module-EmailModule-66c0acc54bdc9097486b5f36027c4e77"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmailModule-66c0acc54bdc9097486b5f36027c4e77"' :
                                            'id="xs-controllers-links-module-EmailModule-66c0acc54bdc9097486b5f36027c4e77"' }>
                                            <li class="link">
                                                <a href="controllers/EmailController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailModule-66c0acc54bdc9097486b5f36027c4e77"' : 'data-target="#xs-injectables-links-module-EmailModule-66c0acc54bdc9097486b5f36027c4e77"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailModule-66c0acc54bdc9097486b5f36027c4e77"' :
                                        'id="xs-injectables-links-module-EmailModule-66c0acc54bdc9097486b5f36027c4e77"' }>
                                        <li class="link">
                                            <a href="injectables/CloudNotificationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CloudNotificationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EmailService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExpenseModule.html" data-type="entity-link">ExpenseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ExpenseModule-d4dc758b8af9c9e68ef6afaa738a58f4"' : 'data-target="#xs-controllers-links-module-ExpenseModule-d4dc758b8af9c9e68ef6afaa738a58f4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExpenseModule-d4dc758b8af9c9e68ef6afaa738a58f4"' :
                                            'id="xs-controllers-links-module-ExpenseModule-d4dc758b8af9c9e68ef6afaa738a58f4"' }>
                                            <li class="link">
                                                <a href="controllers/ExpenseController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExpenseController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ExpenseModule-d4dc758b8af9c9e68ef6afaa738a58f4"' : 'data-target="#xs-injectables-links-module-ExpenseModule-d4dc758b8af9c9e68ef6afaa738a58f4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExpenseModule-d4dc758b8af9c9e68ef6afaa738a58f4"' :
                                        'id="xs-injectables-links-module-ExpenseModule-d4dc758b8af9c9e68ef6afaa738a58f4"' }>
                                        <li class="link">
                                            <a href="injectables/CloudNotificationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CloudNotificationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExpenseService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ExpenseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlanModule.html" data-type="entity-link">PlanModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PlanModule-d929f53154ed253f221b8cf0c34fd846"' : 'data-target="#xs-controllers-links-module-PlanModule-d929f53154ed253f221b8cf0c34fd846"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PlanModule-d929f53154ed253f221b8cf0c34fd846"' :
                                            'id="xs-controllers-links-module-PlanModule-d929f53154ed253f221b8cf0c34fd846"' }>
                                            <li class="link">
                                                <a href="controllers/PlanController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlanController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PlanModule-d929f53154ed253f221b8cf0c34fd846"' : 'data-target="#xs-injectables-links-module-PlanModule-d929f53154ed253f221b8cf0c34fd846"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PlanModule-d929f53154ed253f221b8cf0c34fd846"' :
                                        'id="xs-injectables-links-module-PlanModule-d929f53154ed253f221b8cf0c34fd846"' }>
                                        <li class="link">
                                            <a href="injectables/CloudNotificationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CloudNotificationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PlanService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PlanService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ScheduleModule.html" data-type="entity-link">ScheduleModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ScheduleModule-523581d6b05d0591da76cf4f0acb4d4b"' : 'data-target="#xs-injectables-links-module-ScheduleModule-523581d6b05d0591da76cf4f0acb4d4b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ScheduleModule-523581d6b05d0591da76cf4f0acb4d4b"' :
                                        'id="xs-injectables-links-module-ScheduleModule-523581d6b05d0591da76cf4f0acb4d4b"' }>
                                        <li class="link">
                                            <a href="injectables/ScheduleService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ScheduleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-95af7d8a15a8822107218f49a15b4341"' : 'data-target="#xs-controllers-links-module-UserModule-95af7d8a15a8822107218f49a15b4341"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-95af7d8a15a8822107218f49a15b4341"' :
                                            'id="xs-controllers-links-module-UserModule-95af7d8a15a8822107218f49a15b4341"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-95af7d8a15a8822107218f49a15b4341"' : 'data-target="#xs-injectables-links-module-UserModule-95af7d8a15a8822107218f49a15b4341"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-95af7d8a15a8822107218f49a15b4341"' :
                                        'id="xs-injectables-links-module-UserModule-95af7d8a15a8822107218f49a15b4341"' }>
                                        <li class="link">
                                            <a href="injectables/CloudNotificationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CloudNotificationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PlanService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PlanService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link">AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmailController.html" data-type="entity-link">EmailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ExpenseController.html" data-type="entity-link">ExpenseController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PlanController.html" data-type="entity-link">PlanController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link">UserController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BudgetDto.html" data-type="entity-link">BudgetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CardDto.html" data-type="entity-link">CardDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDto.html" data-type="entity-link">CreateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteDto.html" data-type="entity-link">DeleteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailResetDto.html" data-type="entity-link">EmailResetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExpenseDto.html" data-type="entity-link">ExpenseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageDto.html" data-type="entity-link">ImageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link">LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PassResPageDto.html" data-type="entity-link">PassResPageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlanDto.html" data-type="entity-link">PlanDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProfileUpdateDto.html" data-type="entity-link">ProfileUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenDto.html" data-type="entity-link">TokenDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CloudNotificationService.html" data-type="entity-link">CloudNotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link">EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExpenseService.html" data-type="entity-link">ExpenseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link">JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link">LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModelService.html" data-type="entity-link">ModelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlanService.html" data-type="entity-link">PlanService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScheduleService.html" data-type="entity-link">ScheduleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateService.html" data-type="entity-link">ValidateService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IExpense.html" data-type="entity-link">IExpense</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPlan.html" data-type="entity-link">IPlan</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link">IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});