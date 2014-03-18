<?php defined('SYSPATH') or die('No direct script access.');?>

<div class="page-header">
    <h1><?=__("Forums")?></h1>
    <?if (!Auth::instance()->logged_in()):?>
    <a class="btn btn-success pull-right" data-toggle="modal" data-dismiss="modal" 
        href="<?=Route::url('oc-panel',array('directory'=>'user','controller'=>'auth','action'=>'login'))?>#login-modal">
    <?else:?>
    <a class="btn btn-success pull-right" href="<?=Route::url('forum-new')?>">
    <?endif?>
    <?=__('New Topic')?></a>
<div class="clearfix"></div>
</div>





<div class="panel-body">
    <input type="text" class="form-control" id="task-table-filter" data-action="filter" data-filters="#task-table" placeholder="Filter Tasks" />
</div>
<table class="table table-hover" id="task-table">
    <thead>
        <tr>
            <th><?=__('Forum topic')?></th>
            <th><?=__('Last Message')?></th>
            <th><?=__('Topics')?></th>
        </tr>
    </thead>
    <tbody>
        <?foreach($forums as $f):?>
        <?if($f['id_forum_parent'] == 0):?>
            <tr class="success">
                <td><a title="<?=$f['name']?>" href="<?=Route::url('forum-list', array('forum'=>$f['seoname']))?>"><?=strtoupper($f['name']);?></a></td>
                <td><span class="label label-warning pull-right"><?=(isset($f['last_message'])?Date::format($f['last_message']):'')?></span></td>
                <td><span class="label label-success pull-right"><?=$f['count']?></span></td>
            </tr>
                <?foreach($forums as $fhi):?>
                    <?if($fhi['id_forum_parent'] == $f['id_forum']):?>
                    <tr>
                        <th><a title="<?=$fhi['name']?>" href="<?=Route::url('forum-list', array('forum'=>$fhi['seoname']))?>"><?=$fhi['name'];?></a></th>
                        <th><span class="label label-warning pull-right"><?=(isset($fhi['last_message'])?Date::format($f['last_message']):'')?></span></th>
                        <th><span class="label label-success pull-right"><?=$fhi['count']?></span></th>
                    </tr>
                    <?endif?>
                <?endforeach?>
            <?endif?>
        <?endforeach?>
    </tbody>
</table>


