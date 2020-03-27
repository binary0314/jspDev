<template>
    <Layout>
        <div class="panel panel-default">
            <div class="panel-heading">
                리스트 템플릿
                <div class="pull-right">
                    <a href="#" role="button" class="btn btn-primary">등록하기</a>
                    <a href="#" role="button" class="btn btn-success"><i class="fa fa-download"></i> 엑셀</a>
                </div>
                <div class="clearfix"></div>
            </div>
            
            <!-- Search Start -->
            <div class="panel-body">
                <form class="form-horizontal" role="form" action="<?php echo $_SERVER['PHP_SELF'];?>">
                    <div class="form-group">
                        <label for="search1" class="col-sm-1 control-label">검색1</label>
                        <div class="col-sm-10">
                            <label class="radio-inline">
                                <input type="radio" name="" id="search1" value="" checked="checked">전체
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="" value="">조건1
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="" value="">조건2
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="search2" class="col-sm-1 control-label">검색2</label>
                        <div class="col-sm-10">
                            <label class="checkbox-inline">
                                <input type="checkbox" name="" id="search2" value="" checked="checked">전체
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="" value="">조건1
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="" value="">조건2
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="search3" class="col-sm-1 control-label">검색3</label>
                        <div class="col-sm-2">
                            <select class="form-control" name="" id="search3">
                                <option value="">전체</option>
                                <option value="">조건1</option>
                                <option value="">조건2</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="dateRangeKind" class="col-sm-1 control-label">기간</label>
                        <div class="col-sm-1">
                            <select class="form-control" name="" id="dateRangeKind">
                                <option value="">신청일</option>
                                <option value="">완료일</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <div class="input-daterange input-group">
                                <input type="text" class="form-control" name="" value=""/>
                                <span class="input-group-addon">~</span>
                                <input type="text" class="form-control" name="" value=""/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="keyword" class="col-sm-1 control-label">상세 조건</label>
                        <div class="col-sm-1">
                            <select class="form-control" name="">
                                <option value="">이름</option>
                                <option value="">연락처</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="keyword" name="" value="" placeholder="검색명">
                        </div>
                        <div class="col-sm-2">
                            <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i> 검색</button>
                            <button type="button" class="btn btn-default" onClick="location.href='<?php echo $_SERVER['PHP_SELF'];?>';"><i class="fa fa-refresh"></i> 초기화</button>
                        </div>
                    </div>
                </form>
            </div>
            <!-- Search End -->

            <!-- List Start -->
            <table class="table table-striped table-bordered table-hover">
                <thead class="fixed-block">
                    <tr>
                        <th>컬럼1</th>
                        <th>컬럼2</th>
                        <th>컬럼3</th>
                        <th>컬럼4</th>
                        <th>날짜</th>
                        <th>금액</th>
                        <th>명령</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>컬럼1</th>
                        <th>컬럼2</th>
                        <th>컬럼3</th>
                        <th>컬럼4</th>
                        <th>날짜</th>
                        <th>금액</th>
                        <th>명령</th>
                    </tr>
                </tfoot>
                <tbody>
                    <!--tr> 리스트 결과가 없을 시 출력합니다.
                        <td colspan="7" class="text-center"><h5><em>리스트 결과가 없습니다.</em></h5></td>
                    </tr-->
                    <tr>
                        <td>Tiger Nixon </td>
                        <td>System Architect</td>
                        <td>Edinburgh</td>
                        <td class="text-center">61</td>
                        <td class="text-center">2011/04/25</td>
                        <td class="text-right">$320,800</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Garrett Winters</td>
                        <td>Accountant</td>
                        <td>Tokyo</td>
                        <td class="text-center">63</td>
                        <td class="text-center">2011/07/25</td>
                        <td class="text-right">$170,750</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Ashton Cox</td>
                        <td>Junior Technical Author</td>
                        <td>San Francisco</td>
                        <td class="text-center">66</td>
                        <td class="text-center">2009/01/12</td>
                        <td class="text-right">$86,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Cedric Kelly</td>
                        <td>Senior Javascript Developer</td>
                        <td>Edinburgh</td>
                        <td class="text-center">22</td>
                        <td class="text-center">2012/03/29</td>
                        <td class="text-right">$433,060</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Airi Satou</td>
                        <td>Accountant</td>
                        <td>Tokyo</td>
                        <td class="text-center">33</td>
                        <td class="text-center">2008/11/28</td>
                        <td class="text-right">$162,700</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Brielle Williamson</td>
                        <td>Integration Specialist</td>
                        <td>New York</td>
                        <td class="text-center">61</td>
                        <td class="text-center">2012/12/02</td>
                        <td class="text-right">$372,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Herrod Chandler</td>
                        <td>Sales Assistant</td>
                        <td>San Francisco</td>
                        <td class="text-center">59</td>
                        <td class="text-center">2012/08/06</td>
                        <td class="text-right">$137,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Rhona Davidson</td>
                        <td>Integration Specialist</td>
                        <td>Tokyo</td>
                        <td class="text-center">55</td>
                        <td class="text-center">2010/10/14</td>
                        <td class="text-right">$327,900</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Colleen Hurst</td>
                        <td>Javascript Developer</td>
                        <td>San Francisco</td>
                        <td class="text-center">39</td>
                        <td class="text-center">2009/09/15</td>
                        <td class="text-right">$205,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Sonya Frost</td>
                        <td>Software Engineer</td>
                        <td>Edinburgh</td>
                        <td class="text-center">23</td>
                        <td class="text-center">2008/12/13</td>
                        <td class="text-right">$103,600</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Jena Gaines</td>
                        <td>Office Manager</td>
                        <td>London</td>
                        <td class="text-center">30</td>
                        <td class="text-center">2008/12/19</td>
                        <td class="text-right">$90,560</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Quinn Flynn</td>
                        <td>Support Lead</td>
                        <td>Edinburgh</td>
                        <td class="text-center">22</td>
                        <td class="text-center">2013/03/03</td>
                        <td class="text-right">$342,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Charde Marshall</td>
                        <td>Regional Director</td>
                        <td>San Francisco</td>
                        <td class="text-center">36</td>
                        <td class="text-center">2008/10/16</td>
                        <td class="text-right">$470,600</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Haley Kennedy</td>
                        <td>Senior Marketing Designer</td>
                        <td>London</td>
                        <td class="text-center">43</td>
                        <td class="text-center">2012/12/18</td>
                        <td class="text-right">$313,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Tatyana Fitzpatrick</td>
                        <td>Regional Director</td>
                        <td>London</td>
                        <td class="text-center">19</td>
                        <td class="text-center">2010/03/17</td>
                        <td class="text-right">$385,750</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Michael Silva</td>
                        <td>Marketing Designer</td>
                        <td>London</td>
                        <td class="text-center">66</td>
                        <td class="text-center">2012/11/27</td>
                        <td class="text-right">$198,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Paul Byrd</td>
                        <td>Chief Financial Officer (CFO)</td>
                        <td>New York</td>
                        <td class="text-center">64</td>
                        <td class="text-center">2010/06/09</td>
                        <td class="text-right">$725,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Gloria Little</td>
                        <td>Systems Administrator</td>
                        <td>New York</td>
                        <td class="text-center">59</td>
                        <td class="text-center">2009/04/10</td>
                        <td class="text-right">$237,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Bradley Greer</td>
                        <td>Software Engineer</td>
                        <td>London</td>
                        <td class="text-center">41</td>
                        <td class="text-center">2012/10/13</td>
                        <td class="text-right">$132,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Dai Rios</td>
                        <td>Personnel Lead</td>
                        <td>Edinburgh</td>
                        <td class="text-center">35</td>
                        <td class="text-center">2012/09/26</td>
                        <td class="text-right">$217,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Jenette Caldwell</td>
                        <td>Development Lead</td>
                        <td>New York</td>
                        <td class="text-center">30</td>
                        <td class="text-center">2011/09/03</td>
                        <td class="text-right">$345,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Yuri Berry</td>
                        <td>Chief Marketing Officer (CMO)</td>
                        <td>New York</td>
                        <td class="text-center">40</td>
                        <td class="text-center">2009/06/25</td>
                        <td class="text-right">$675,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Caesar Vance</td>
                        <td>Pre-Sales Support</td>
                        <td>New York</td>
                        <td class="text-center">21</td>
                        <td class="text-center">2011/12/12</td>
                        <td class="text-right">$106,450</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Doris Wilder</td>
                        <td>Sales Assistant</td>
                        <td>Sidney</td>
                        <td class="text-center">23</td>
                        <td class="text-center">2010/09/20</td>
                        <td class="text-right">$85,600</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Angelica Ramos</td>
                        <td>Chief Executive Officer (CEO)</td>
                        <td>London</td>
                        <td class="text-center">47</td>
                        <td class="text-center">2009/10/09</td>
                        <td class="text-right">$1,200,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Gavin Joyce</td>
                        <td>Developer</td>
                        <td>Edinburgh</td>
                        <td class="text-center">42</td>
                        <td class="text-center">2010/12/22</td>
                        <td class="text-right">$92,575</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Jennifer Chang</td>
                        <td>Regional Director</td>
                        <td>Singapore</td>
                        <td class="text-center">28</td>
                        <td class="text-center">2010/11/14</td>
                        <td class="text-right">$357,650</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Brenden Wagner</td>
                        <td>Software Engineer</td>
                        <td>San Francisco</td>
                        <td class="text-center">28</td>
                        <td class="text-center">2011/06/07</td>
                        <td class="text-right">$206,850</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Fiona Green</td>
                        <td>Chief Operating Officer (COO)</td>
                        <td>San Francisco</td>
                        <td class="text-center">48</td>
                        <td class="text-center">2010/03/11</td>
                        <td class="text-right">$850,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Shou Itou</td>
                        <td>Regional Marketing</td>
                        <td>Tokyo</td>
                        <td class="text-center">20</td>
                        <td class="text-center">2011/08/14</td>
                        <td class="text-right">$163,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Michelle House</td>
                        <td>Integration Specialist</td>
                        <td>Sidney</td>
                        <td class="text-center">37</td>
                        <td class="text-center">2011/06/02</td>
                        <td class="text-right">$95,400</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Suki Burks</td>
                        <td>Developer</td>
                        <td>London</td>
                        <td class="text-center">53</td>
                        <td class="text-center">2009/10/22</td>
                        <td class="text-right">$114,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Prescott Bartlett</td>
                        <td>Technical Author</td>
                        <td>London</td>
                        <td class="text-center">27</td>
                        <td class="text-center">2011/05/07</td>
                        <td class="text-right">$145,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Gavin Cortez</td>
                        <td>Team Leader</td>
                        <td>San Francisco</td>
                        <td class="text-center">22</td>
                        <td class="text-center">2008/10/26</td>
                        <td class="text-right">$235,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Martena Mccray</td>
                        <td>Post-Sales support</td>
                        <td>Edinburgh</td>
                        <td class="text-center">46</td>
                        <td class="text-center">2011/03/09</td>
                        <td class="text-right">$324,050</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Unity Butler</td>
                        <td>Marketing Designer</td>
                        <td>San Francisco</td>
                        <td class="text-center">47</td>
                        <td class="text-center">2009/12/09</td>
                        <td class="text-right">$85,675</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Howard Hatfield</td>
                        <td>Office Manager</td>
                        <td>San Francisco</td>
                        <td class="text-center">51</td>
                        <td class="text-center">2008/12/16</td>
                        <td class="text-right">$164,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Hope Fuentes</td>
                        <td>Secretary</td>
                        <td>San Francisco</td>
                        <td class="text-center">41</td>
                        <td class="text-center">2010/02/12</td>
                        <td class="text-right">$109,850</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Vivian Harrell</td>
                        <td>Financial Controller</td>
                        <td>San Francisco</td>
                        <td class="text-center">62</td>
                        <td class="text-center">2009/02/14</td>
                        <td class="text-right">$452,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Timothy Mooney</td>
                        <td>Office Manager</td>
                        <td>London</td>
                        <td class="text-center">37</td>
                        <td class="text-center">2008/12/11</td>
                        <td class="text-right">$136,200</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Jackson Bradshaw</td>
                        <td>Director</td>
                        <td>New York</td>
                        <td class="text-center">65</td>
                        <td class="text-center">2008/09/26</td>
                        <td class="text-right">$645,750</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Olivia Liang</td>
                        <td>Support Engineer</td>
                        <td>Singapore</td>
                        <td class="text-center">64</td>
                        <td class="text-center">2011/02/03</td>
                        <td class="text-right">$234,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Bruno Nash</td>
                        <td>Software Engineer</td>
                        <td>London</td>
                        <td class="text-center">38</td>
                        <td class="text-center">2011/05/03</td>
                        <td class="text-right">$163,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Sakura Yamamoto</td>
                        <td>Support Engineer</td>
                        <td>Tokyo</td>
                        <td class="text-center">37</td>
                        <td class="text-center">2009/08/19</td>
                        <td class="text-right">$139,575</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Thor Walton</td>
                        <td>Developer</td>
                        <td>New York</td>
                        <td class="text-center">61</td>
                        <td class="text-center">2013/08/11</td>
                        <td class="text-right">$98,540</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Finn Camacho</td>
                        <td>Support Engineer</td>
                        <td>San Francisco</td>
                        <td class="text-center">47</td>
                        <td class="text-center">2009/07/07</td>
                        <td class="text-right">$87,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Serge Baldwin</td>
                        <td>Data Coordinator</td>
                        <td>Singapore</td>
                        <td class="text-center">64</td>
                        <td class="text-center">2012/04/09</td>
                        <td class="text-right">$138,575</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Zenaida Frank</td>
                        <td>Software Engineer</td>
                        <td>New York</td>
                        <td class="text-center">63</td>
                        <td class="text-center">2010/01/04</td>
                        <td class="text-right">$125,250</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Zorita Serrano</td>
                        <td>Software Engineer</td>
                        <td>San Francisco</td>
                        <td class="text-center">56</td>
                        <td class="text-center">2012/06/01</td>
                        <td class="text-right">$115,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Jennifer Acosta</td>
                        <td>Junior Javascript Developer</td>
                        <td>Edinburgh</td>
                        <td class="text-center">43</td>
                        <td class="text-center">2013/02/01</td>
                        <td class="text-right">$75,650</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Cara Stevens</td>
                        <td>Sales Assistant</td>
                        <td>New York</td>
                        <td class="text-center">46</td>
                        <td class="text-center">2011/12/06</td>
                        <td class="text-right">$145,600</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Hermione Butler</td>
                        <td>Regional Director</td>
                        <td>London</td>
                        <td class="text-center">47</td>
                        <td class="text-center">2011/03/21</td>
                        <td class="text-right">$356,250</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Lael Greer</td>
                        <td>Systems Administrator</td>
                        <td>London</td>
                        <td class="text-center">21</td>
                        <td class="text-center">2009/02/27</td>
                        <td class="text-right">$103,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Jonas Alexander</td>
                        <td>Developer</td>
                        <td>San Francisco</td>
                        <td class="text-center">30</td>
                        <td class="text-center">2010/07/14</td>
                        <td class="text-right">$86,500</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Shad Decker</td>
                        <td>Regional Director</td>
                        <td>Edinburgh</td>
                        <td class="text-center">51</td>
                        <td class="text-center">2008/11/13</td>
                        <td class="text-right">$183,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Michael Bruce</td>
                        <td>Javascript Developer</td>
                        <td>Singapore</td>
                        <td class="text-center">29</td>
                        <td class="text-center">2011/06/27</td>
                        <td class="text-right">$183,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Donna Snider</td>
                        <td>Customer Support</td>
                        <td>New York</td>
                        <td class="text-center">27</td>
                        <td class="text-center">2011/01/25</td>
                        <td class="text-right">$112,000</td>
                        <td class="text-center">
                            <button class="btn btn-default btn-data-layer">레이어</button>
                            <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                            <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- List End -->
            
            <!-- Paging Start -->
            <div class="panel-body text-center">
                <!-- 실제 페이징 시에는 php쪽 주석부분(if문, foreach문) 제거하고 사용하세요 -->
                <ul class="pagination">
                <!-- 처음 페이지 -->
                <li class="disabled"><span>처음</span></li>
            

                <!-- 이전 블록 -->
                <li class="disabled"><span>&laquo;</span></li>			
                    <!-- 실제 페이징 시에는 아래 부분 지우고 사용하세요 -->
                    <li class="active"><a href="?1">1</a></li>
                    <li class=""><a href="?2">2</a></li>
                    <li class=""><a href="?3">3</a></li>
                    <li class=""><a href="?4">4</a></li>
                    <li class=""><a href="?5">5</a></li>
                    <li class=""><a href="?6">6</a></li>
                    <li class=""><a href="?7">7</a></li>
                    <li class=""><a href="?8">8</a></li>
                    <li class=""><a href="?9">9</a></li>
                    <li class=""><a href="?10">10</a></li>
                    <!-- 다음 블록 -->
                    <li><a href="?11">&raquo;</a></li>
                    <!-- 끝 페이지 -->
                    <li><a href="?12">마지막</a></li>

                </ul>
            </div>
            <!-- Paging End -->
            
        </div>
    </Layout>
</template>

<script>
export default {
}
</script>

<style>

</style>